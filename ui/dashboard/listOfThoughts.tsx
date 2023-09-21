import { ThoughtResponse } from '@/app/actions/thoughts'
import { ContentThoughts } from './editor/content-thoughts'
import { ThoughtsEmpty } from './editor/empty-thoughts'

interface ListOfThoughtsProps {
  thoughts: Promise<ThoughtResponse>
}

export async function ListOfThoughts({ thoughts }: ListOfThoughtsProps) {
  const thoughtsData = await thoughts

  return (
    <div className="sm:w-2/4 min-w-[300px] border-x border-y w-full flex flex-col prose-sm prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none">
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
