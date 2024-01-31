import Image from 'next/image'

import { CreateThought } from '../../shared/create-thoughts'

export function ThoughtsEmpty() {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
      <Image src="/_static/illustrations/write-note.svg" width="300" height="300" alt="Note taking" />
      <h2 className="z-10 text-xl font-semibold">It seems like you don&apos;t have any thoughts yet.</h2>
      <CreateThought />
    </div>
  )
}
