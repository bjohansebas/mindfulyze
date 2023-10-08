import Chat from '@/components/ui/home/landing/chat'
import CTA from '@/components/ui/home/landing/cta'
import Hero from '@/components/ui/home/landing/hero'
import SecureData from '@/components/ui/home/landing/secure-data'
import SentimentAnalysis from '@/components/ui/home/landing/sentiment-analysis'
import Templates from '@/components/ui/home/landing/templates'

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
