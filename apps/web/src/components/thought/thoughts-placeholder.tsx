import { Skeleton } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

export default function ThoughtsPlaceholder() {
  return (
    <section className="flex w-full flex-col">
      {Array.from({ length: 10 }).map((_, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <article key={i} className="flex max-w-full gap-x-3">
          <div className="after:-translate-x-[0.5px] relative after:absolute after:start-3.5 after:top-0 after:bottom-0 after:w-px after:bg-primary last:after:hidden dark:group-hover:after:bg-primary">
            <div
              className={cn('relative z-10 flex h-[60px] w-7 items-center justify-center', {
                'h-9': i === 0,
              })}
            >
              <div className="h-3 w-3 rounded-full border-2 border-secondary bg-primary group-hover:border-primary" />
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className={cn('flex w-full items-center justify-between py-3 pb-0', { 'pt-0': i === 0 })}>
              <Skeleton className="h-6 w-[150px] rounded-md px-3" />
              <Skeleton className="h-8 w-10 rounded-md border-b px-3" />
            </div>
            <div className="h-[250px] rounded-xl border border-primary px-6 py-5">
              {Array.from({ length: 5 }).map((_, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                <Skeleton className={cn('mb-4 w-full', { 'h-6': i % 2 === 0, 'h-9': i % 2 !== 0 })} key={i} />
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
