import { ThoughtResponse } from '@/app/actions/thoughts'
import { ContentThoughts } from './content-thoughts'
import { ThoughtsEmpty } from './empty-thoughts'

interface ListOfThoughtsProps {
  thoughts: Promise<ThoughtResponse>
}

export async function ListOfThoughts({ thoughts }: ListOfThoughtsProps) {
  const thoughtsData = await thoughts

  return (
    <div className="border w-full flex flex-col rounded-2xl bg-card max-h-full overflow-y-auto">
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
