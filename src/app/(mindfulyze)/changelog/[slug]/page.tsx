import { MDX } from '@/components/content/mdx'
import { Twitter } from '@/components/shared/icons'
import Facebook from '@/components/shared/icons/facebook'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { HOME_DOMAIN } from '@/lib/constants'
import { constructMetadata } from '@/lib/metadata'
import { formatDate } from '@/lib/utils'
import { allChangelogPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return allChangelogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = allChangelogPosts.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const { title, summary: description } = post

  return constructMetadata({
    title: `${title} - Mindfulyze`,
    description,
  })
}

export default async function ChangelogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = allChangelogPosts.find((post) => post.slug === params.slug)
  if (!post) {
    notFound()
  }

  return (
    <MaxWidthWrapper className="my-20 grid px-0 md:grid-cols-4">
      <div className="sticky top-16 hidden self-start md:col-span-1 md:block">
        <Link href="/changelog" className="text-sm text-gray-200 transition-colors hover:text-gray-50">
          ← Back to Changelog
        </Link>
      </div>
      <div className="flex flex-col space-y-8 md:col-span-3">
        <div className="mx-5 grid gap-5 md:mx-0">
          <div className="flex flex-col">
            <Link href="/changelog" className="my-5 text-sm text-gray-50 md:hidden">
              ← Back to Changelog
            </Link>
            <time dateTime={post.publishedAt} className="flex items-center text-sm text-gray-200 md:text-base">
              {formatDate(post.publishedAt)}
            </time>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-primary-600 sm:text-4xl">{post.title}</h1>
        </div>
        <div className="mx-5 mb-10 flex items-center justify-between md:mx-0">
          <div className="flex items-center space-x-6">
            <Link
              href={`https://twitter.com/intent/tweet?text=${post.title}&url=${HOME_DOMAIN}/changelog/${post.slug}&via=${post.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${HOME_DOMAIN}/changelog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <Facebook className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <MDX code={post.body.code} className="mx-5 sm:prose-lg md:mx-0 text-foreground" />
      </div>
    </MaxWidthWrapper>
  )
}
