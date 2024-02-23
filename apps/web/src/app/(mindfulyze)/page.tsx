import Link from 'next/link'

import { Button, MindfulyzeIconWithText } from '@mindfulyze/ui'
import { Bookmarks } from '@ui/shared/illustrations/bookmarks'
import { Draw } from '@ui/shared/illustrations/draw'
import { SecureData } from '@ui/shared/illustrations/secure-data'

export default function Page() {
  return (
    <>
      <header className="max-w-lg md:max-w-3xl mx-auto md:pt-16 pt-10 px-2 md:px-0 mb-20">
        <h1 className="font-semibold text-[2rem] md:text-6xl text-center text-balance">
          Practice journaling in a <span className="text-primary">safe</span> and{' '}
          <span className="text-primary">simple</span> manner
        </h1>
        <p className="mt-6 max-w-[26rem] mx-auto md:max-w-xl text-muted-foreground lg:leading-loose text-pretty text-center">
          Turn every moment into an opportunity to grow and get to know yourself, exploring your thoughts and ideas in
          one single place.
        </p>
        <div className="flex justify-center mt-6 sm:mt-10">
          <Button shape="rounded" size="lg" asChild>
            <Link href="/signup">Start for Free</Link>
          </Button>
        </div>
      </header>
      <main className=" max-w-lg md:max-w-5xl mx-auto flex flex-col gap-20 mb-20">
        <section className="flex items-center gap-3 md:flex-row flex-col justify-center">
          <SecureData className="w-[80%]" />
          <header className="flex flex-col gap-6 items-center p-5">
            <h2 className="text-center text-4xl font-bold text-emerald-600">Create your notes super fast</h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              With the help of templates, you will have the ease of starting to write a journal and reflect on the
              things that matter most.
            </p>
          </header>
        </section>
        <section className="grid grid-cols-2 gap-3 items-center place-items-center">
          <header className="flex flex-col gap-6 items-center p-5">
            <h2 className="text-center text-4xl font-bold text-emerald-600">Write safely</h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              Using AES-256 encryption, your personal diary is securely protected. Only you can decrypt and access them,
              ensuring that no one else
            </p>
          </header>
          <div className="">
            <Bookmarks className="h-96 text-[#e6e7e8]" />
          </div>
        </section>
        <section className="grid grid-cols-2 gap-3 items-center place-items-center">
          <div>
            <Draw className="h-96" />
          </div>
          <header className="flex flex-col gap-6 items-center p-5">
            <h2 className="text-center text-4xl font-bold text-emerald-600">Write safely</h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              Using AES-256 encryption, your personal diary is securely protected. Only you can decrypt and access them,
              ensuring that no one else
            </p>
          </header>
        </section>
        <section className="flex justify-center flex-col items-center gap-3">
          <MindfulyzeIconWithText className="w-auto h-16 text-primary" />
          <h2 className="text-4xl md:text-5xl font-semibold md:max-w-md max-w-sm text-center text-balance">
            Free your <span className="text-primary">thoughts</span> free your{' '}
            <span className="text-primary">mind</span>
          </h2>
          <Button asChild className="mt-5">
            <Link href="/signup">Try Mindfulyze For Free</Link>
          </Button>
        </section>
      </main>
    </>
  )
}
