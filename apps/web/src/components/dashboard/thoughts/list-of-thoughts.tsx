import { getThoughts } from '@/lib/api/thoughts'
import { ContentThoughts } from './content-thoughts'
import { ThoughtsEmpty } from './empty-thoughts'

export async function ListOfThoughts() {
  const thoughtsData = await getThoughts()

  return (
    <div className="border w-full max-w-full flex flex-col rounded-2xl bg-card max-h-full overflow-y-auto">
      {thoughtsData.data.length > 0 ? (
        thoughtsData.data.map(({ id, text, createdAt }) => (
          <ContentThoughts key={id} text={text} id={id} createdAt={createdAt} />
        ))
      ) : (
        <ThoughtsEmpty />
      )}
    </div>
  )
}
