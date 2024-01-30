import { getThoughts } from '@/lib/api/thoughts'
import { ThoughtsEmpty } from '../dashboard/thoughts/empty-thoughts'
import { ThoughtEditor } from './thought-editor'

export async function ThoughtsList() {
  const thoughtsData = await getThoughts()

  return thoughtsData.data.length > 0 ? (
    thoughtsData.data.map(({ id, text, createdAt }) => (
      <>
        <ThoughtEditor key={id} text={text} id={id} createdAt={createdAt} />
      </>
    ))
  ) : (
    <ThoughtsEmpty />
  )
}
