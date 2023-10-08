import { Metadata } from 'next'
import { HOME_DOMAIN, MINDFULYZE_THUMBNAIL } from './constants'

export function constructMetadata({
  title = 'Mindfulyze - Record moments from your day, free your thoughts and emotions in a safe way.',
  description = 'Capture, express, and reflect on your day in a secure and private space. Start your journey of self-expression and personal growth',
  image = MINDFULYZE_THUMBNAIL,
  icons = '/favicon.ico',
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@bjohansebas',
    },
    icons,
    metadataBase: new URL(HOME_DOMAIN),
    themeColor: '#00cf76',
    manifest: '/manifest.json',
    keywords: [
      'Mindfulyze',
      'Personal grow',
      'Diary',
      'Journaling',
      'Reflection',
      'Private diary',
      'Notes',
      'Mindfulness',
      'Secure journaling',
      'Encrypted diary',
      'AI',
      'Artificial intelligence',
      'Sentiment analysis',
      'Thoughts',
    ],
    colorScheme: 'only light',
  }
}
