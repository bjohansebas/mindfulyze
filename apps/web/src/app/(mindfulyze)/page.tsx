import Link from 'next/link'

import { Button, MindfulyzeIconWithText } from '@mindfulyze/ui'
import { CardFeatures } from '@ui/home/card-features'
import { BookLockIcon, BookmarkIcon, LandPlotIcon, LayoutTemplateIcon } from 'lucide-react'

export default function Page() {
  return (
    <>
      <header className="mx-auto mb-20 max-w-lg px-2 pt-10 md:max-w-3xl md:px-0 md:pt-16">
        <h1 className="text-balance text-center font-semibold text-[2rem] md:text-6xl">
          Practice journaling in a <span className="text-primary">safe</span> and{' '}
          <span className="text-primary">simple</span> manner
        </h1>
        <p className="mx-auto mt-6 max-w-[26rem] text-pretty text-center text-muted-foreground md:max-w-xl lg:leading-loose">
          Turn every moment into an opportunity to grow and get to know yourself, exploring your thoughts and ideas in
          one single place.
        </p>
        <div className="mt-6 flex justify-center sm:mt-10">
          <Button shape="rounded" size="lg" asChild>
            <Link href="/signup">Start for Free</Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto mb-20 flex max-w-lg flex-col gap-20 px-10 md:max-w-6xl">
        <section className="grid grid-cols-[repeat(auto-fit_,minmax(276px,1fr))] place-items-center gap-4">
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
        <section className="flex flex-col items-center justify-center gap-3">
          <MindfulyzeIconWithText className="h-16 w-auto text-primary" />
          <h2 className="max-w-sm text-balance text-center font-semibold text-4xl md:max-w-md md:text-5xl">
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
