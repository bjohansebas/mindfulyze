import { Skeleton } from '@ui/skeleton'

const Templates = () => {
  return (
    <div className="max-w-3xl w-full">
      <div className="border w-full flex flex-col rounded-2xl bg-card max-h-full overflow-y-auto">
        <div className="h-96 w-full">
          <div className="flex w-full border-b px-4 py-2 justify-between">
            <Skeleton className="h-8 rounded-md px-3 w-[150px]" />
            <Skeleton className="h-8 rounded-md px-3 w-10 border-b" />
          </div>
          <div className="h-[calc(24rem-50px)] p-4">
            {Array.from({ length: 7 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <Skeleton className={`w-full ${i % 2 === 0 ? 'h-6' : 'h-9'} mb-4`} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Templates