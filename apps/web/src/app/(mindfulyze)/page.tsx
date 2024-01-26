import CTA from '@/components/home/landing/cta'
import Hero from '@/components/home/landing/hero'

import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { LayoutTemplateIcon } from 'lucide-react'

export default function Page() {
  return (
    <>
      <header className="max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center tracking-tighter">
          Store moments from your day
          <br />
          <span className="text-emerald-600">Securely</span>
        </h1>
        <h2 className="mt-6 text-lg text-slate-300 text-center max-w-2xl mx-auto">
          Capture, express, and reflect on your day in a secure and private space. Start your journey of self-expression
          and personal growth
        </h2>
        <Hero />
      </header>

      <div className="mt-20 sm:mt-24 p-10">
        <section>
          <header className="flex flex-col gap-6 items-center p-5">
            <LayoutTemplateIcon className="w-32 h-32" />
            <h2 className="text-center text-4xl font-bold text-emerald-600">Create your notes super fast</h2>
            <p className="text-center max-w-3xl mx-auto text-lg">
              With the help of templates, you will have the ease of starting to write a journal and reflect on the
              things that matter most.
            </p>
          </header>
        </section>
        <section>
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
