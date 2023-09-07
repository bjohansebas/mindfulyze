import { ContentThoughts } from './editor/content-thoughts'
import { ThoughtsEmpty } from './editor/empty-thoughts'
import { Thought } from '@/@types/thought'

interface ListOfThoughtsProps {
  thoughts: Promise<Thought[]>
}

export async function ListOfThoughts({ thoughts }: ListOfThoughtsProps) {
  const thoughtsData = await thoughts 
  
  return (
    <div className="sm:w-2/4 min-w-[300px] flex flex-col gap-4 prose-sm prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none">
      {thoughtsData.length > 0 ? (
        thoughtsData.map(({ id, text, createdAt }) => <ContentThoughts key={id} text={text} createdAt={createdAt} />)
      ) : (
        <ThoughtsEmpty />
      )}
    </div>
  )
}
