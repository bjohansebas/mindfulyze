import { Metadata } from 'next'
import { allLegalPosts } from 'contentlayer/generated'

import LegalPage from '@/ui/content/legal'
import { constructMetadata } from '@/lib/metadata'

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy – Mindfulyze',
})

export default function Privacy() {
  const post = allLegalPosts.find((post) => post.slug === 'privacy')!
  return <LegalPage post={post} />
}
