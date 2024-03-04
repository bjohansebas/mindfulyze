import { legal } from '@content'
import { formatDate } from '@lib/utils'
import { constructMetadata } from '@mindfulyze/utils'
import { MDX } from '@ui/content/mdx'
import MaxWidthWrapper from '@ui/shared/max-width-wrapper'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

interface LegalProps {
  params: {
    slug: string
  }
}

function getLegalBySlug(slug: string) {
  return legal.find((legal) => legal.slug === slug)
}

export function generateMetadata({ params }: LegalProps): Metadata {
  const post = getLegalBySlug(params.slug)

  if (post == null) return {}

  return constructMetadata({ title: post.title })
}

export function generateStaticParams(): LegalProps['params'][] {
  return legal.map((post) => ({
    slug: post.slug,
  }))
}

export default function LegalPage({ params }: LegalProps) {
  const legal = getLegalBySlug(params.slug)

  if (legal == null) notFound()

  return (
    <div>
      <div className="py-10">
        <h1 className="mt-5 text-center text-4xl font-extrabold leading-[1.15] text-primary sm:text-6xl">
          {legal.title}
        </h1>
      </div>
      <MaxWidthWrapper className="flex max-w-screen-md flex-col items-center p-10 sm:pt-20">
        <MDX code={legal.content} className="text-foreground" />
        <div className="mt-10 w-full border-t border-gray-200 pt-10 text-center">
          <p>Last updated: {formatDate(legal.updated.toString())}</p>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
