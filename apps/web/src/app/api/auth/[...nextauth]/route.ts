import { authOptions } from '@/lib/auth'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

// async function refreshAccessToken(token) {
//   try {
//     const cookie = `Authentication=${token.accessToken}; Refresh=${token.refreshToken}; `
//     const response = await fetch(process.env.NEXTAUTH_API_URL + '/auth/refresh', {
//       method: 'POST',
//       headers: { cookie },
//     })

//     const refreshedTokens = await response.json()

//     if (!response.ok) {
//       throw refreshedTokens
//     }

//     const { accessToken, accessTokenExpirationTime, refreshToken } = refreshedTokens.metadata

//     const updatedToken = {
//       ...token,
//       accessToken,
//       accessTokenExpires: Date.now() + accessTokenExpirationTime,
//       refreshToken: refreshToken ?? token.refreshToken, // Fall back to old refresh token
//     }

//     return updatedToken
//   } catch (error) {
//     console.error('RefreshAccessTokenError', error)
//     return {
//       ...token,
//       error: 'RefreshAccessTokenError',
//     }
//   }
// }
