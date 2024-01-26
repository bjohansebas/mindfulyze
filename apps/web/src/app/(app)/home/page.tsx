import { ThoughtsList } from '@ui/thought/thoughts-list'
import ThoughtsPlaceholder from '@ui/thought/thoughts-placeholder'

import { Suspense } from 'react'

export default async function Page() {
  return (
    <div className="h-screen max-h-screen overflow-y-scroll md:px-12 px-6 pb-6 flex flex-col max-w-full">
      <Suspense fallback={<ThoughtsPlaceholder />}>
        <ThoughtsList />
      </Suspense>
    </div>
  )
}
