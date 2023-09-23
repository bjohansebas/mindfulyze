import { getThoughts } from '@/lib/api/thoughts'
import ThoughtsPlaceholder from '@/ui/dashboard/editor/placeholder-thoughts'
import { HeadDashboard } from '@/ui/dashboard/heading/heading'
import { ListOfThoughts } from '@/ui/dashboard/listOfThoughts'

import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <div className="flex flex-col items-center w-full mt-6 gap-4">
      <HeadDashboard />
      <Suspense fallback={<ThoughtsPlaceholder />}>
        <ListOfThoughts thoughts={getThoughts()} />
      </Suspense>
    </div>
  )
}
