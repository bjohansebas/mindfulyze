import type { MetadataRoute } from 'next'

import { HOME_DOMAIN } from '@mindfulyze/utils'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/api/',
      allow: '/api/og/',
    },
    sitemap: `${HOME_DOMAIN}/sitemap.xml`,
  }
}
