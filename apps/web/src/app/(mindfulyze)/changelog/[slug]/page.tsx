import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { MDX } from '@/components/content/mdx'
import Facebook from '@/components/shared/icons/facebook'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { format } from 'date-fns'

import { changelog } from '@content'
import { HOME_DOMAIN } from '@mindfulyze/utils'
import { constructMetadata } from '@mindfulyze/utils'
import { LinkedinIcon, TwitterIcon } from 'lucide-react'
import Image from 'next/image'

export async function generateStaticParams() {
  return changelog.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata | undefined> {
  const post = changelog.find((post) => post.slug === params.slug)
  if (!post) {
    return
  }

  const { title, summary: description, image } = post

  return constructMetadata({
    title: `${title} - Mindfulyze`,
    description,
    image,
  })
}

export default async function ChangelogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = changelog.find((post) => post.slug === params.slug)
  if (!post) {
    notFound()
  }

  return (
    <MaxWidthWrapper className="mt-10 mb-20 grid px-0 md:grid-cols-4">
      <div className="sticky top-16 hidden self-start md:col-span-1 md:block">
        <Link href="/changelog" className="text-sm text-foreground transition-colors hover:text-emerald-400">
          ← Back to Changelog
        </Link>
      </div>
      <div className="flex flex-col space-y-8 md:col-span-3">
        <div className="mx-5 grid gap-5 md:mx-0">
          <div className="flex flex-col">
            <Link
              href="/changelog"
              className="my-5 text-sm text-foreground md:hidden hover:text-emerald-400 active:text-emerald-400"
            >
              ← Back to Changelog
            </Link>
            <time dateTime={post.publishedAt} className="flex items-center text-sm text-foreground md:text-base">
              {format(post.publishedAt, 'LLLL dd, y')}
            </time>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-emerald-500 sm:text-4xl">{post.title}</h1>
        </div>
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            priority // since it's above the fold
            className="rounded-2xl"
          />
        ) : null}

        <div className="mx-5 mb-10 flex items-center justify-between md:mx-0">
          <div className="flex items-center gap-3">
            <Link
              href={`https://twitter.com/intent/tweet?text=${post.title}&url=${HOME_DOMAIN}/changelog/${post.slug}&via=${post.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <TwitterIcon className="h-6 w-6" />
            </Link>
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${HOME_DOMAIN}/changelog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <Facebook className="h-6 w-6" />
            </Link>
            <Link
              href={` http://www.linkedin.com/shareArticle?mini=true&url=${HOME_DOMAIN}/changelog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all hover:scale-110"
            >
              <LinkedinIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <MDX code={post.content} className="mx-5 sm:prose-lg md:mx-0 text-foreground" />
      </div>
    </MaxWidthWrapper>
  )
}
