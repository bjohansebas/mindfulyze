import CTA from '@/components/home/landing/cta'
import Hero from '@/components/home/landing/hero'
import { SecureDataPreview } from '@/components/home/landing/secure-data'
import { SentimentAnalysis } from '@/components/home/landing/sentiment-analysis'
import Templates from '@/components/home/landing/templates'
import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { Badge } from '@ui/badge'

export default function Page() {
  return (
    <>
      <header className="max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
        <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl text-center tracking-tighter">
          Store moments from your day
          <br />
          <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
            Securely
          </span>
        </h1>
        <h2 className="mt-6 text-lg text-slate-300 text-center max-w-2xl mx-auto">
          Capture, express, and reflect on your day in a secure and private space. Start your journey of self-expression
          and personal growth
        </h2>
        <Hero />
      </header>
      <section className="mt-20 sm:mt-24 mb-20 sm:mb-24  flex md:flex-row flex-col items-center px-8">
        <header className="flex flex-col gap-6 items-center md:mb-0 mb-10">
          <ShieldCheckIcon className="w-32 h-32" />
          <h2 className=" text-center text-4xl font-bold text-primary-600 sm:text-5xl">Write safely</h2>
          <p className="text-center max-w-3xl mx-auto text-lg">
            Using AES-256 encryption, your personal diary is securely protected. Only you can decrypt and access them,
            ensuring that no one else
          </p>
        </header>
        <SecureDataPreview />
      </section>
      <Templates />
      <section className="flex items-center flex-col lg:flex-row gap-4">
        <header className="px-10 w-5/6 lg:w-1/2 flex flex-col gap-6 items-center">
          <h2 className=" text-center text-4xl font-bold text-primary-600 sm:text-5xl">
            Sentiment Analysis <Badge>Soon</Badge>
          </h2>
          <p className="text-center max-w-3xl mx-auto text-lg">
            With the help of AI, you will have the ability to experience how your day was or that thought you had during
            the day.
          </p>
        </header>
        <SentimentAnalysis />
      </section>
      <CTA />
    </>
  )
}
