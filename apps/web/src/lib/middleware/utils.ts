import { NextRequest } from 'next/server'

export const parse = (req: NextRequest) => {
  // path is the path of the URL (e.g. dub.sh/stats/github -> /stats/github)
  const path = req.nextUrl.pathname

  // Here, we are using decodeURIComponent to handle foreign languages like Hebrew
  const key = decodeURIComponent(path.split('/')[1]) // key is the first part of the path (e.g. dub.sh/stats/github -> stats)
  const fullKey = decodeURIComponent(path.slice(1)) // fullKey is the full path without the first slash (to account for multi-level subpaths, e.g. dub.sh/github/repo -> github/repo)

  return { path, key, fullKey }
}
