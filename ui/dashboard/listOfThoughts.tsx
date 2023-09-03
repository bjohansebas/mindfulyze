'use client'

import useThoughts from '@/lib/swr/use-thoughts'
import { ContentThoughts } from './editor/content-thoughts'
import { ThoughtsEmpty } from './editor/empty-thoughts'
import ThoughtsPlaceholder from './editor/placeholder-thoughts'

export function ListOfThoughts() {
  const { thoughts } = useThoughts()

  return (
    <div className="sm:w-2/4 min-w-[300px] flex flex-col gap-4 prose-sm prose-stone dark:prose-invert prose-headings:font-display font-default focus:outline-none">
      {thoughts ? (
        thoughts.length > 0 ? (
          thoughts.map(({ id, text, createdAt }) => <ContentThoughts key={id} text={text} createdAt={createdAt} />)
        ) : (
          <ThoughtsEmpty />
        )
      ) : (
        Array.from({ length: 5 }).map((_, i) => <ThoughtsPlaceholder key={i} />)
      )}
    </div>
  )
}
