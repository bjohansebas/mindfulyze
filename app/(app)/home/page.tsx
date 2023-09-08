import ThoughtsPlaceholder from '@/ui/dashboard/editor/placeholder-thoughts'
import { ListOfThoughts } from '@/ui/dashboard/listOfThoughts'
import { Skeleton } from '@/ui/skeleton'
import dynamic from 'next/dynamic'

import { Suspense } from 'react'

const EditorThought = dynamic(() => import('@/ui/dashboard/editor/editor-thought'), {
  loading: () => (
    <div className="flex flex-col  gap-1 sm:w-2/4 min-w-[300px] w-screen rounded-lg">
      <Skeleton className=" min-h-48 h-48 w-full min-w-[300px] max-h-56 p-6" />
      <div className="flex justify-between items-center px-6 py-2">
        <Skeleton className="w-[240px] h-9" />
        <Skeleton className="h-9 w-[75.95px]" />
      </div>
    </div>
  ),
})

export default async function Page() {
  return (
    <div className="flex flex-col items-center w-full mt-6 gap-4">
      <EditorThought />
      <Suspense fallback={<ThoughtsPlaceholder />}>
        <ListOfThoughts />
      </Suspense>
    </div>
  )
}
