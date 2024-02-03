import { MDX } from '@/components/content/mdx'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { formatDate } from '@/lib/utils'
import { constructMetadata } from '@mindfulyze/utils'

import { allChangelogPosts } from 'contentlayer/generated'
import { Twitter } from 'lucide-react'
import Image from 'next/image'

import Link from 'next/link'

export const metadata = constructMetadata({
  title: 'Changelog – Mindfulyze',
  description: 'All the latest updates, improvements, and fixes to Mindfulyze.',
})

export default function Changelog() {
  return (
    <MaxWidthWrapper className="px-0">
      <div className="relative grid border-b border-gray-200 py-20 md:grid-cols-4">
        <div className="md:col-span-1" />
        <div className="mx-5 flex flex-col space-y-6 md:col-span-3 md:mx-0">
          <h1 className="text-4xl font-bold tracking-tight text-emerald-600 md:text-5xl">Changelog</h1>
          <p className="text-lg text-gray-100">New updates and improvements to Mindfulyze.</p>
        </div>
        <div className="absolute bottom-2 right-0 flex items-center space-x-2">
          <p className="text-sm text-gray-100">Subscribe to updates →</p>
          <Link
            href="https://twitter.com/mindfulyze"
            className="rounded-full p-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-6 w-6 text-[#1d9bf0]" />
          </Link>
        </div>
      </div>

      <div className="divide-y">
        {allChangelogPosts
          .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
          .map(async (post, idx) => (
            <div key={post.title} className="grid py-10 md:grid-cols-4 md:px-5 xl:px-0">
              <div className="sticky top-20 hidden self-start md:col-span-1 md:block">
                <Link href={`/changelog/${post.slug}`}>
                  <time dateTime={post.publishedAt} className="text-gray-200 transition-colors hover:text-gray-100">
                    {formatDate(post.publishedAt)}
                  </time>
                </Link>
              </div>
              <div className="flex flex-col gap-6 md:col-span-3">
                {post.image ? (
                  <Link href={`/changelog/${post.slug}`}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={1200}
                      height={630}
                      priority={idx === 0} // since it's above the fold
                      className="rounded-2xl"
                    />
                  </Link>
                ) : null}

                <Link href={`/changelog/${post.slug}`} className="group mx-5 flex items-center space-x-3 md:mx-0">
                  <time
                    dateTime={post.publishedAt}
                    className="text-sm text-gray-200 transition-all group-hover:text-gray-100 md:hidden"
                  >
                    {formatDate(post.publishedAt)}
                  </time>
                </Link>
                <Link href={`/changelog/${post.slug}`} className="mx-5 md:mx-0">
                  <h2 className="text-3xl font-bold tracking-tight text-emerald-500 hover:underline hover:decoration-1 hover:underline-offset-4 md:text-4xl">
                    {post.title}
                  </h2>
                </Link>
                <MDX code={post.body.code} className="mx-5 sm:prose-lg md:mx-0 text-foreground" />
              </div>
            </div>
          ))}
      </div>
    </MaxWidthWrapper>
  )
}
