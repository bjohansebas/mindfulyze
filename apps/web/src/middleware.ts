import { PRIVATE_APP_ROUTES } from '@mindfulyze/utils'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { parse } from './lib/middleware/utils'
import { User } from './types/user'

export default async function middleware(req: NextRequest) {
  const { key, path } = parse(req)

  const session = (await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })) as {
    email?: string
    pw?: string
    user?: User
  }

  // if there's no session and the path isn't /login or /register, redirect to /login
  if (!session?.email && PRIVATE_APP_ROUTES.has(key)) {
    return NextResponse.redirect(new URL(`/login${path !== '/' ? `?next=${encodeURIComponent(path)}` : ''}`, req.url))
  }

  // if there's a session
  if (session?.email) {
    // if the user was created in the last 10s and the path isn't /welcome, redirect to /welcome
    // (this is a workaround because the `isNewUser` flag is triggered when a user does `dangerousEmailAccountLinking`)
    // if (
    //   session?.user?.createdAt &&
    //   new Date(session?.user?.createdAt).getTime() > Date.now() - 10000 &&
    //   path !== '/welcome'
    // ) {
    //   return NextResponse.redirect(new URL('/welcome', req.url))
    // } else
    if (
      !session?.pw &&
      path !== '/settings/password' &&
      (path === '/login' || path === '/signup' || path === '/' || path === '/home' || path === '/settings')
    ) {
      return NextResponse.redirect(new URL('/settings/password', req.url))
    }

    // if the path is /login or /signup, redirect to "/home"
    if (path === '/login' || path === '/signup' || path === '/') {
      return NextResponse.redirect(new URL('/home', req.url))
    }

    if (session?.pw != null && path === '/settings/password') {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/ (special page for OG tags proxying)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     */
    '/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}
