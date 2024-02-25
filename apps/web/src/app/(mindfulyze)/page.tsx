import Link from 'next/link'

import { Button, MindfulyzeIconWithText } from '@mindfulyze/ui'
import Image from 'next/image'

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
      <main className=" max-w-lg md:max-w-6xl mx-auto flex flex-col mb-20">
        <section className="grid md:grid-cols-5 gap-x-4 mb-4">
          <article className="col-span-3 flex border gap-3 flex-col pb-3 bg-card rounded-md">
            <header className="flex flex-col gap-3 items-center p-5 w-full">
              <h2 className="text-center text-4xl font-bold text-emerald-600 text-balance">
                All your thoughts in one place
              </h2>
              <p className="text-center max-w-3xl mx-auto text-lg text-pretty">
                Store all your thoughts and reflections in one easy and secure place
              </p>
            </header>
          </article>
          <article className="col-span-2 flex border gap-3 flex-col pb-3 bg-card rounded-md">
            <header className="flex flex-col gap-6 items-center p-5 w-full">
              <h2 className="text-center text-4xl font-bold text-emerald-600 text-balance">Express yourself freely</h2>
              <p className="text-center max-w-3xl mx-auto text-lg text-pretty">
                All your thoughts will be encrypted, only you will be able to read them.
              </p>
            </header>
          </article>
        </section>
        <section className="grid grid-cols-5 gap-x-4 mb-20">
          <article className="col-span-2 flex border gap-3 flex-col pb-3 bg-card rounded-md">
            <header className="flex flex-col gap-6 items-center p-5 w-full">
              <h2 className="text-center text-4xl font-bold text-emerald-600 text-balance">
                Quickly create reflections
              </h2>
              <p className="text-center max-w-3xl mx-auto text-lg text-pretty">
                Have your own style in all your notes by creating your own templates
              </p>
            </header>
          </article>
          <article className="col-span-3 flex border gap-3 flex-col pb-3 bg-card rounded-md">
            <header className="flex flex-col gap-6 items-center p-5 w-full">
              <h2 className="text-center text-4xl font-bold text-emerald-600 text-balance">
                Keep your thoughts organized
              </h2>
              <p className="text-center max-w-3xl mx-auto text-lg text-pretty">
                You can easily organize and filter your thoughts by dates and bookmarks
              </p>
            </header>
          </article>
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
