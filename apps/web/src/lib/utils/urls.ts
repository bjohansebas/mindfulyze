import type { NextRequest } from 'next/server'

export const parseUrl = (req: NextRequest) => {
  const domain = req.headers.get('host') as string

  // path is the path of the URL (e.g. mindfulyze.com/app/admin -> /app/admin)
  const path = req.nextUrl.pathname

  // fullPath is the full URL path (along with search params)
  const searchParams = req.nextUrl.searchParams.toString()
  const fullPath = `${path}${searchParams.length > 0 ? `?${searchParams}` : ''}`

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split('/')[1] || '') // key is the first part of the path (e.g. mindfulyze.com/app/admin -> app)
  const fullKey = decodeURIComponent(path.slice(1)) // fullKey is the full path without the first slash (to account for multi-level subpaths, e.g. mindfulyze.com/app/admin -> app/admin)

  return { domain, path, fullPath, key, fullKey }
}
