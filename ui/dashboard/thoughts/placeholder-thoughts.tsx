import { Skeleton } from '@/ui/skeleton'

export default function ThoughtsPlaceholder() {
  return (
    <div className="border w-full flex flex-col rounded-2xl bg-card max-h-full overflow-y-auto">
      {Array.from({ length: 2 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div className="h-[70vh] w-full" key={i}>
          <div className="flex w-full border-b px-4 py-2 justify-between">
            <Skeleton className="h-8 rounded-md px-3 w-[150px]" />
            <Skeleton className="h-8 rounded-md px-3 w-10 border-b" />
          </div>
          <div className="h-[calc(70vh-50px)] p-6">
            {Array.from({ length: 8 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Skeleton className={`w-full ${i % 2 === 0 ? 'h-6' : 'h-9'} mb-4`} key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
