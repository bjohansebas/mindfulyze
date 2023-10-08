import Chat from '@/components/home/landing/chat'
import CTA from '@/components/home/landing/cta'
import Hero from '@/components/home/landing/hero'
import SecureData from '@/components/home/landing/secure-data'
import SentimentAnalysis from '@/components/home/landing/sentiment-analysis'
import Templates from '@/components/home/landing/templates'

export default function Page() {
  return (
    <>
      <Hero />
      <SecureData />
      <Templates />
      <SentimentAnalysis />
      <Chat />
      <CTA />
    </>
  )
}
