import { Skeleton } from '@mindfulyze/ui'

export default function TemplatesPlaceholder() {
  return (
    <div className="flex h-full w-full flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Skeleton className="h-[54px] w-full" key={i} />
      ))}
    </div>
  )
}
