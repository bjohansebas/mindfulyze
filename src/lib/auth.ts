import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { createUserSubscriptionFree, getUserSubscriptionHandler } from './api/subscriptions'

const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  cookies: {
    sessionToken: {
      name: `${VERCEL_DEPLOYMENT ? '__Secure-' : ''}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
        domain: VERCEL_DEPLOYMENT ? '.mindfulyze.com' : undefined,
        secure: VERCEL_DEPLOYMENT,
      },
    },
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      if (!token.email) {
        return {}
      }

      if (user) {
        token.user = user
      }

      if (!token?.pw) {
        token.pw = null
      }

      if (trigger === 'update') {
        if (session?.pw) {
          token.pw = session.pw
        }

        const refreshedUser = await prisma.user.findUnique({
          where: { id: token.sub },
        })

        if (refreshedUser) {
          token.user = refreshedUser
          token.name = refreshedUser.name
          token.email = refreshedUser.email
          token.image = refreshedUser.image
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      session.user = {
        // @ts-ignore
        id: token.sub,
        // @ts-ignore
        pw: token.pw || null,
        ...session.user,
        // @ts-ignore
        image: token?.image || token.picture,
      }

      const subscriptionPlan = await getUserSubscriptionHandler(session.user.id)
      session.user.subscriptionPlan = subscriptionPlan || null

      return session
    },
  },
  /**
   * Events allow Next-Auth to do some custom action after certain user actions like creating a new account or signing in,
   * without blocking the auth flow. Read more about the event system.
   * Next-Auth will call this function after a new user account is registered.
   * @see https://dev.to/ajones_codes/how-to-add-user-accounts-and-paid-subscriptions-to-your-nextjs-website-585e
   * @see https://next-auth.js.org/configuration/events
   */
  events: {
    createUser: async ({ user }) => {
      // Connect user with the subscription free plan
      await createUserSubscriptionFree(user)
    },
  },
}
