import { Skeleton } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

export default function EditorTemplatesPlaceholder() {
  return (
    <div className="flex max-h-full w-full flex-col overflow-y-auto rounded-2xl border bg-card">
      <div className="h-full w-full">
        <div className="flex w-full justify-between border-b px-4 py-2">
          <Skeleton className="h-8 w-[150px] rounded-md px-3" />
          <Skeleton className="h-8 w-10 rounded-md border-b px-3" />
        </div>
        <div className="h-full p-6">
          {Array.from({ length: 12 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <Skeleton className={cn('mb-4 w-full', { 'h-6': i % 2 === 0, 'h-9': i % 2 !== 0 })} key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
