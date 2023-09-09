import { getThoughts } from '@/app/actions/thoughts'
import { DialogThought } from '@/ui/dashboard/editor/dialog-thoughts'
import ThoughtsPlaceholder from '@/ui/dashboard/editor/placeholder-thoughts'
import { ListOfThoughts } from '@/ui/dashboard/listOfThoughts'

import { Suspense } from 'react'


export default async function Page() {
  const thoughts = getThoughts()

  return (
    <div className="flex flex-col items-center w-full mt-6 gap-4">
      <div className="bg-white sm:w-2/4 w-screen flex p-4 rounded-lg shadow justify-end border bor">
        <DialogThought/>

      </div>
      <Suspense fallback={<ThoughtsPlaceholder />}>
        <ListOfThoughts thoughts={thoughts} />
      </Suspense>
    </div>
  )
}
