import { HOME_DOMAIN } from '@/lib/constants'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      disallow: '/api/',
      allow: '/api/og/',
    },
    sitemap: `https://${HOME_DOMAIN}/sitemap.xml`,
  }
}
