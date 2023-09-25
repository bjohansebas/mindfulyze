import { getThoughts } from '@/lib/api/thoughts'
import { ListOfThoughts } from '@/ui/dashboard/thoughts/list-of-thoughts'
import ThoughtsPlaceholder from '@/ui/dashboard/thoughts/placeholder-thoughts'

import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <div className="w-full flex justify-center p-6 h-screen">
      <Suspense fallback={<ThoughtsPlaceholder />}>
        <ListOfThoughts thoughts={getThoughts()} />
      </Suspense>
    </div>
  )
}
