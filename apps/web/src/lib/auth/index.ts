import { prisma } from '@mindfulyze/database'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '@mindfulyze/utils'

import type { NextAuthConfig } from 'next-auth'
import NextAuth from 'next-auth'

import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'

const config: NextAuthConfig = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID as string,
      clientSecret: GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  adapter: PrismaAdapter(prisma),
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

      return session
    },
  },
}

export const { handlers, auth, signIn, signOut, unstable_update: update } = NextAuth(config)
