import { getBookmarks } from '@actions/bookmarks'
import { cn } from '@mindfulyze/utils'

import { getThoughts } from '@/lib/actions/thought'
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
  const thougths = getThoughts({ page: currentPage, toDate, fromDate })
  const bookmarks = getBookmarks()

  const [thoughtsData, bookmarksData] = await Promise.all([thougths, bookmarks])

  return thoughtsData.data != null && thoughtsData.data.length > 0 ? (
    thoughtsData.data.map(({ id, text, createdAt, bookmarks }, index) => (
      <article key={id} className="flex max-w-full gap-x-3">
        <div className="after:-translate-x-[0.5px] relative after:absolute after:start-3.5 after:top-0 after:bottom-0 last:after:hidden after:w-px after:bg-primary dark:group-hover:after:bg-primary">
          <div
            className={cn('relative z-10 flex h-[60px] w-7 items-center justify-center', {
              'h-9': index === 0,
            })}
          >
            <div className="h-3 w-3 rounded-full border-2 border-secondary bg-primary group-hover:border-primary" />
          </div>
        </div>
        <ThoughtEditor
          thoughtBookmarks={bookmarks ?? []}
          text={text}
          id={id}
          createdAt={createdAt}
          classNameHeader={cn({ 'pt-0': index === 0 })}
          userBookmarks={bookmarksData.data ?? []}
        />
      </article>
    ))
  ) : (
    <ThoughtsEmpty />
  )
}
