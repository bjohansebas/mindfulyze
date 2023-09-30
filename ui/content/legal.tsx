import { LegalPost } from 'contentlayer/generated'

import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { formatDate } from '@/lib/utils'
import { MDX } from '@/ui/content/mdx'

export default function LegalPage({ post }: { post: LegalPost }) {
  return (
    <div>
      <div className="py-10">
        <h1 className="mt-5 text-center font-display text-4xl font-extrabold leading-[1.15] text-primary-600 sm:text-6xl">
          {post.title}
        </h1>
      </div>
      <MaxWidthWrapper className="flex max-w-screen-md flex-col items-center p-10 sm:pt-20">
        <MDX code={post.body.code} className="text-foreground" />
        <div className="mt-10 w-full border-t border-gray-200 pt-10 text-center">
          <p>Last updated: {formatDate(post.updatedAt)}</p>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
