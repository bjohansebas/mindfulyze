import CTA from '@/components/home/landing/cta'
import Hero from '@/components/home/landing/hero'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { LayoutTemplateIcon } from 'lucide-react'

export default function Page() {
  return (
    <>
      <header className="max-w-lg md:max-w-3xl mx-auto md:pt-16 pt-10  px-2 md:px-0">
        <h1 className="font-bold text-[2rem] md:text-6xl text-center text-balance">
          Practice journaling in a <span className="text-primary">safe</span> and{' '}
          <span className="text-primary">simple</span> manner
        </h1>
        <p className="mt-4 max-w-[26rem] mx-auto md:max-w-xl text-muted-foreground lg:leading-loose text-pretty text-center">
          Turn every moment into an opportunity to grow and get to know yourself, exploring your thoughts and ideas in
          one single place.
        </p>
        <Hero />
      </header>
      <div className="mt-20 sm:mt-24 p-10 grid grid-cols-2 grid-rows-2 gap-4 place-items-center">
        <section className="col-span-2 md:col-span-1">
          <header className="flex flex-col gap-6 items-center p-5">
            <LayoutTemplateIcon className="w-32 h-32" />
            <h2 className="text-center text-4xl font-bold text-emerald-600">Create your notes super fast</h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              With the help of templates, you will have the ease of starting to write a journal and reflect on the
              things that matter most.
            </p>
          </header>
        </section>
        <section className="col-span-2 md:col-span-1">
          <header className="flex flex-col gap-6 items-center p-5">
            <ShieldCheckIcon className="w-32 h-32" />
            <h2 className="text-center text-4xl font-bold text-emerald-600">Write safely</h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              Using AES-256 encryption, your personal diary is securely protected. Only you can decrypt and access them,
              ensuring that no one else
            </p>
          </header>
        </section>
      </div>
      <CTA />
    </>
  )
}
