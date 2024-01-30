import { getThoughts } from '@/lib/api/thoughts'
import { ThoughtsEmpty } from '../dashboard/thoughts/empty-thoughts'
import { ThoughtEditor } from './thought-editor'

export async function ThoughtsList({
  currentPage,
}: {
  currentPage: number
}) {
  const thoughtsData = await getThoughts({ page: currentPage })

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
