import { Skeleton } from '@/components/ui/skeleton'

export default function ThoughtsPlaceholder() {
  return (
    <div className="w-full flex flex-col">
      {Array.from({ length: 10 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <div className="w-full flex flex-col gap-4" key={i}>
          <div className="flex w-full py-4 pb-0 justify-between items-center">
            <Skeleton className="h-6 rounded-md px-3 w-[150px]" />
            <Skeleton className="h-8 rounded-md px-3 w-10 border-b" />
          </div>
          <div className="h-[250px] border border-primary rounded-xl p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Skeleton className={`w-full ${i % 2 === 0 ? 'h-6' : 'h-9'} mb-4`} key={i} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
