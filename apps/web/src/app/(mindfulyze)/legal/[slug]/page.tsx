import { constructMetadata } from '@mindfulyze/utils'

import { legal } from '@content'
import { MDX } from '@ui/content/mdx'
import MaxWidthWrapper from '@ui/shared/max-width-wrapper'

import { format } from 'date-fns'
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
        <h1 className="mt-5 text-center font-extrabold text-4xl text-primary leading-[1.15] sm:text-6xl">
          {legal.title}
        </h1>
      </div>
      <MaxWidthWrapper className="flex max-w-screen-md flex-col items-center p-10 sm:pt-20">
        <MDX code={legal.content} className="text-foreground" />
        <div className="mt-10 w-full border-gray-200 border-t pt-10 text-center">
          <p>Last updated: {format(legal.updated.toString(), 'LLLL d, yyyy')}</p>
        </div>
      </MaxWidthWrapper>
    </div>
  )
}
