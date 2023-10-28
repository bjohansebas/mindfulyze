import CTA from '@/components/home/landing/cta'
import Hero from '@/components/home/landing/hero'
import SecureData from '@/components/home/landing/secure-data'
import SentimentAnalysis from '@/components/home/landing/sentiment-analysis'
import Templates from '@/components/home/landing/templates'

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
      <SecureData />
      <Templates />
      <SentimentAnalysis />
      <CTA />
    </>
  )
}
