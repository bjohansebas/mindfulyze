import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@mindfulyze/utils'

export default function ThoughtsPlaceholder() {
  return (
    <section className="w-full flex flex-col">
      {Array.from({ length: 10 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <article key={i} className="flex gap-x-3 max-w-full">
          <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-primary   dark:group-hover:after:bg-primary">
            <div
              className={cn('relative z-10 w-7 h-[60px] flex justify-center items-center', {
                'h-9': i === 0,
              })}
            >
              <div className="w-3 h-3 rounded-full bg-primary border-2 border-secondary group-hover:border-primary" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className={cn('flex w-full  py-3 pb-0 justify-between items-center', { 'pt-0': i === 0 })}>
              <Skeleton className="h-6 rounded-md px-3 w-[150px]" />
              <Skeleton className="h-8 rounded-md px-3 w-10 border-b" />
            </div>
            <div className="h-[250px] border border-primary rounded-xl px-6 py-5">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Skeleton className={`w-full ${i % 2 === 0 ? 'h-6' : 'h-9'} mb-4`} key={i} />
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
