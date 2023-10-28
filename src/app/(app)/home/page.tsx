import { ListOfThoughts } from '@/components/dashboard/thoughts/list-of-thoughts'
import ThoughtsPlaceholder from '@/components/dashboard/thoughts/placeholder-thoughts'

import { Suspense } from 'react'

export default async function Page() {
  return (
    <div className="w-full flex justify-center p-6 h-screen">
      <Suspense fallback={<ThoughtsPlaceholder />}>
        <ListOfThoughts />
      </Suspense>
    </div>
  )
}
