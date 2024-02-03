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
  const thoughtsData = await getThoughts({ page: currentPage, toDate, fromDate })

  return thoughtsData.data.length > 0 ? (
    thoughtsData.data.map(({ id, text, createdAt }) => (
      <section key={id}>
        <ThoughtEditor text={text} id={id} createdAt={createdAt} />
      </section>
    ))
  ) : (
    <ThoughtsEmpty />
  )
}
