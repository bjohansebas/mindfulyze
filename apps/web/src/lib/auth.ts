import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
export const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credential',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-type': 'application/json' },
        })

        const user = await res.json()

        if (res.ok && user) {
          return user
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { accessToken, refreshToken } = user
        token.accessToken = accessToken
        token.refreshToken = refreshToken
      }
      // if (Date.now() < token.accessTokenExpires) {
      return token
      // }

      // const updatedToken = await refreshAccessToken(token)

      // return updatedToken
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      // session.accessTokenExpiry = token.accessTokenExpiry
      return Promise.resolve(session)
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}
