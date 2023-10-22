import { Skeleton } from '../ui/skeleton'

export function CardsPricingPlaceholder() {
  return (
    <div className="flex w-full flex-col justify-center mb-9 items-center">
      <Skeleton className="w-[279px] h-8 mb-14" />
      <div className="flex w-full flex-col justify-center items-center">
        <div className="min-w-[384px] lg:w-full grid grid-cols-1 gap-10 lg:grid-cols-2 lg:max-w-4xl">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              className=" border border-gray-600 flex flex-col gap-6 rounded-2xl bg-card w-full max-w-sm lg:max-w-none px-8 py-6"
            >
              <header className="flex items-center justify-between">
                <Skeleton className="w-[146px] h-8" />

                <Skeleton className="w-[69px] h-[22px]" />
              </header>
              <div className="flex flex-col gap-3">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-[60px]" />
              </div>
              <ul className="space-y-5 px-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <div key={i} className="w-full flex gap-5">
                    <Skeleton className="h-6 w-6 rounded-full" />

                    <Skeleton className="h-7 w-full" />
                  </div>
                ))}
              </ul>
              <Skeleton className="w-full h-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
