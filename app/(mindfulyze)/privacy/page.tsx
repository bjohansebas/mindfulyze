import { allLegalPosts } from 'contentlayer/generated'
import { Metadata } from 'next'

import { constructMetadata } from '@/lib/metadata'
import LegalPage from '@/ui/content/legal'

export const metadata: Metadata = constructMetadata({
  title: 'Privacy Policy – Mindfulyze',
})

export default function Privacy() {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const post = allLegalPosts.find((post) => post.slug === 'privacy')!
  return <LegalPage post={post} />
}
