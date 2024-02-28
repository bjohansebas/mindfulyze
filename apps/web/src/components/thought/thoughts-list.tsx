import { getThoughts } from '@/lib/actions/thought'
import { cn } from '@mindfulyze/utils'
import { ThoughtsEmpty } from '../dashboard/thoughts/empty-thoughts'
import { ThoughtEditor } from './thought-editor'

export async function ThoughtsList({
  currentPage,
  toDate,
  fromDate,
}: {
  currentPage: number
  toDate?: string
  fromDate?: string
}) {
  const thoughtsData = await getThoughts({ page: currentPage, toDate, fromDate })

  return thoughtsData.data != null && thoughtsData.data.length > 0 ? (
    thoughtsData.data.map(({ id, text, createdAt }, index) => (
      <article key={id} className="flex gap-x-3 max-w-full">
        <div className="relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-primary   dark:group-hover:after:bg-primary">
          <div
            className={cn('relative z-10 w-7 h-[60px] flex justify-center items-center', {
              'h-9': index === 0,
            })}
          >
            <div className="w-3 h-3 rounded-full bg-primary border-2 border-secondary group-hover:border-primary" />
          </div>
        </div>
        <ThoughtEditor text={text} id={id} createdAt={createdAt} classNameHeader={cn({ 'pt-0': index === 0 })} />
      </article>
    ))
  ) : (
    <ThoughtsEmpty />
  )
}
