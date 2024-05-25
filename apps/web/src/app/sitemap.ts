import { legal } from '@content'
import { headers } from 'next/headers'

export default async function Sitemap() {
  const headersList = headers()

  const domain = headersList.get('host') as string

  return [
    {
      url: `https://${domain}`,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `https://${domain}/login`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'yearly',
    },
    {
      url: `https://${domain}/signup`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'yearly',
    },
    ...legal.map((post) => ({
      url: `https://${domain}/legal/${post.slug}`,
      lastModified: new Date(post.updated),
      priority: 0.8,
      changeFrequency: 'yearly',
    })),
  ]
}
