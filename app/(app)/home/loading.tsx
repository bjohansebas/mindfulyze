import { Button } from '@/ui/button'
import ThoughtsPlaceholder from '@/ui/dashboard/editor/placeholder-thoughts'
import { ChevronDownIcon } from 'lucide-react'

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex flex-col items-center w-screen mt-6 gap-4">
      <div className="bg-white sm:w-2/4 w-screen flex p-4 rounded-lg shadow justify-end border bor">
        <Button className="w-[133.967px] rounded-r-none" disabled />
        <Button className="p-1 rounded-l-none" disabled>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </div>
      <ThoughtsPlaceholder />
    </div>
  )
}
