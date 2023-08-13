import { parse } from '@/lib/middleware/utils'
import { getToken } from 'next-auth/jwt'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const { path } = parse(req)

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // if there's a session
  if (session?.email) {
    // if the path is /login or /signup, redirect to "/"
    if (path === '/login' || path === '/signup') {
      return NextResponse.redirect(new URL('/', req.url))
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
    '/((?!api/|_next/|_proxy/|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
