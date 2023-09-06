import Chat from '@/ui/home/landing/chat'
import CTA from '@/ui/home/landing/cta'
import Hero from '@/ui/home/landing/hero'
import SecureData from '@/ui/home/landing/secure-data'
import SentimentAnalysis from '@/ui/home/landing/sentiment-analysis'
import Templates from '@/ui/home/landing/templates'

export default function Page() {
  return (
    <>
      <Hero />
      <SecureData />
      <SentimentAnalysis />
      <Templates />
      <Chat />
      <CTA />
    </>
  )
}
