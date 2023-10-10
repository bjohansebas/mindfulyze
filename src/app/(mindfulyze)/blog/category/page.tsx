import BlogCard from '@/components/content/blog-card'
import { BLOG_CATEGORIES } from '@/lib/constants'
import { constructMetadata } from '@/lib/metadata'
import { allBlogPosts } from 'contentlayer/generated'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const category = BLOG_CATEGORIES.find((category) => category.slug === params.slug)
  if (!category) {
    return
  }

  const { title, description } = category

  return constructMetadata({
    title: `${title} Posts – Mindfulyze Blog`,
    description,
    // image: `/api/og/help?title=${encodeURIComponent(
    //   title,
    // )}&summary=${encodeURIComponent(description)}`,
  })
}

export default async function BlogCategory({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const data = BLOG_CATEGORIES.find((category) => category.slug === params.slug)

  if (!data) {
    notFound()
  }

  const articles = await Promise.all(
    allBlogPosts
      .filter((post) => post.categories.includes(data.slug))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map(async (post) => ({
        ...post,
      })),
  )

  return articles.map((article, idx) => <BlogCard key={article.slug} data={article} priority={idx <= 1} />)
}