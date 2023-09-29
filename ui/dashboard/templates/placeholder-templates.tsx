import { Skeleton } from '@/ui/skeleton'

export default function TemplatesPlaceholder() {
  return (
    <div className="w-full flex flex-col gap-3 h-full">
      {Array.from({ length: 3 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <Skeleton className="h-[54px] w-full" key={i} />
      ))}
    </div>
  )
}
