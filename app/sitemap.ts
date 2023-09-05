import { headers } from 'next/headers'
import { allChangelogPosts, allLegalPosts } from 'contentlayer/generated'

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
    // {
    //   url: `https://${domain}/pricing`,
    //   lastModified: new Date(),
    // },
    // {
    //   url: `https://${domain}/blog`,
    //   lastModified: new Date(),
    // },
    // ...allBlogPosts.map((post) => ({
    //   url: `https://${domain}/blog/${post.slug}`,
    //   lastModified: new Date(post.publishedAt),
    // })),
    // ...BLOG_CATEGORIES.map((category) => ({
    //   url: `https://${domain}/blog/category/${category.slug}`,
    //   lastModified: new Date(),
    // })),
    // {
    //   url: `https://${domain}/help`,
    //   lastModified: new Date(),
    // },
    // ...allHelpPosts.map((post) => ({
    //   url: `https://${domain}/help/article/${post.slug}`,
    //   lastModified: new Date(post.updatedAt),
    // })),
    // ...HELP_CATEGORIES.map((category) => ({
    //   url: `https://${domain}/help/category/${category.slug}`,
    //   lastModified: new Date(),
    // })),
    {
      url: `https://${domain}/changelog`,
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: 'weekly',
    },
    ...allChangelogPosts.map((post) => ({
      url: `https://${domain}/changelog/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      priority: 0.6,
      changeFrequency: 'never',
    })),
    ...allLegalPosts.map((post) => ({
      url: `https://${domain}/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      priority: 0.8,
      changeFrequency: 'yearly',
    })),
  ]
}
