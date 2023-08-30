import prisma from '@/lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

// const VERCEL_DEPLOYMENT = !!process.env.VERCEL_URL

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
  // cookies: {
  //   sessionToken: {
  //     name: `${VERCEL_DEPLOYMENT ? '__Secure-' : ''}next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       // When working on localhost, the cookie domain must be omitted entirely (https://stackoverflow.com/a/1188145)
  //       domain: VERCEL_DEPLOYMENT ? '.mindfulyze.com' : undefined,
  //       secure: VERCEL_DEPLOYMENT,
  //     },
  //   },
  // },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (!user.email) {
        return false
      }

      if (account?.provider === 'google') {
        const userExists = await prisma.user.findUnique({
          where: { email: user.email },
          select: { name: true },
        })

        // if the user already exists via email,
        // update the user with their name and image from Google
        if (userExists && !userExists.name) {
          await prisma.user.update({
            where: { email: user.email },
            data: {
              name: profile?.name,
              // @ts-ignore - this is a bug in the types, `picture` is a valid on the `Profile` type
              image: profile?.picture,
            },
          })
        }
      }

      return true
    },
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

        token.user = refreshedUser
        token.name = refreshedUser?.name
        token.email = refreshedUser?.email
        token.image = refreshedUser?.image
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
      }
      return session
    },
  },
}
