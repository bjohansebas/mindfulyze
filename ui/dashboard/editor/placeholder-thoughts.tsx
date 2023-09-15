import { Skeleton } from '@/ui/skeleton'

export default function ThoughtsPlaceholder() {
  return (<>
    {Array.from({ length: 2 }).map((_, i) => (
      <div className="flex flex-col  gap-1 sm:w-2/4 min-w-[300px] w-screen rounded-lg" key={i}>
        <Skeleton className=" min-h-48 h-48 w-full min-w-[300px] max-h-56 p-6" />
        <div className="flex justify-start items-center px-6 py-2">
          <Skeleton className="w-[240px] h-9" />
        </div>
      </div>
    ))}
  </>
  )
}
