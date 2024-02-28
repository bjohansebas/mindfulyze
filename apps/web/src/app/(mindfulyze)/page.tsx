import Link from 'next/link'

import { Button, MindfulyzeIconWithText } from '@mindfulyze/ui'
import { CardFeatures } from '@ui/home/card-features'
import { BookLockIcon, BookmarkIcon, LandPlotIcon, LayoutTemplateIcon } from 'lucide-react'

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
      <main className="max-w-lg md:max-w-6xl mx-auto flex flex-col mb-20 gap-20 px-10">
        <section className="grid grid-cols-[repeat(auto-fit_,minmax(276px,1fr))] gap-4 place-items-center">
          <CardFeatures
            title="All your thoughts in one place"
            description="Store all your thoughts and reflections in one easy and secure place"
            icon={<LandPlotIcon className="h-16 w-16" />}
          />
          <CardFeatures
            title="Express yourself freely"
            description="All your thoughts will be encrypted, only you will be able to read them."
            icon={<BookLockIcon className="h-16 w-16" />}
          />
          <CardFeatures
            title="Quickly create reflections"
            description="Have your own style in all your notes by creating your own templates"
            icon={<LayoutTemplateIcon className="h-16 w-16" />}
          />
          <CardFeatures
            title="Keep your thoughts organized"
            description="You can easily organize and filter your thoughts by dates and bookmarks"
            icon={<BookmarkIcon className="h-16 w-16" />}
          />
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
