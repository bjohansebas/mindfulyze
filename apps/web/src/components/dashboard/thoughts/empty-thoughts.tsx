import Image from 'next/image'

import { CreateThought } from '../../shared/thoughts/create-thoughts'

export function ThoughtsEmpty() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <Image src="/_static/illustrations/write-note.svg" width="300" height="300" alt="Note taking" />
      <h2 className="z-10 font-semibold text-xl">It seems like you don&apos;t have any thoughts yet.</h2>
      <CreateThought />
    </div>
  )
}
