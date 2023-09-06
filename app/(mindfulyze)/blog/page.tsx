import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { constructMetadata } from '@/lib/metadata'
import BlogCard from '@/ui/content/blog-card'
import BlogLayoutHero from '@/ui/content/blog-layout-hero'
import { allBlogPosts } from 'contentlayer/generated'

export const metadata = constructMetadata({
  title: 'Blog – Mindfulyze',
  description: 'Latest news and updates from Mindfulyze.',
})

export default async function Blog() {
  const articles = await Promise.all(
    // order by publishedAt (desc)
    allBlogPosts
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map(async (post) => ({
        ...post,
      })),
  )

  return (
    <>
      <BlogLayoutHero />
      <div className="min-h-[50vh] border border-gray-200 bg-white/50 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur-lg">
        <MaxWidthWrapper className="grid grid-cols-1 gap-8 py-10 md:grid-cols-2">
          {articles.map((article, idx) => (
            <BlogCard key={article.slug} data={article} priority={idx <= 1} />
          ))}
        </MaxWidthWrapper>
      </div>
    </>
  )
}
