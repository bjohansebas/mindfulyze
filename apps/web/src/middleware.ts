import { PRIVATE_APP_ROUTES } from '@mindfulyze/utils'

import { parseUrl } from '@lib/utils/urls'
import type { User } from 'types/user'

import { getToken } from 'next-auth/jwt'
import { type NextRequest, NextResponse } from 'next/server'

export default async function middleware(req: NextRequest) {
  const { key, path } = parseUrl(req)

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
    if (
      !session?.pw &&
      path !== '/settings/password' &&
      path !== '/settings/password/new' &&
      (path === '/login' || path === '/signup' || path === '/' || path === '/home')
    ) {
      return NextResponse.redirect(new URL('/settings/password', req.url))
    }

    // if the path is /login or /signup, redirect to "/home"
    if (path === '/login' || path === '/signup' || path === '/') {
      return NextResponse.redirect(new URL('/home', req.url))
    }

    if (session?.pw != null && (path === '/settings/password' || path === '/settings/password/new')) {
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
