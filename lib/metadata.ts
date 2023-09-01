import { Metadata } from 'next'
import { HOME_DOMAIN, MINDFULYZE_THUMBNAIL } from './constants'

export function constructMetadata({
  title = 'Mindfulyze - Record moments from your day, free your thoughts and emotions in a safe way.',
  description = 'Capture the moments that shape your day. Express yourself freely, alleviate your thoughts, and release your emotions in a secure and private environment. Our platform offers a safe space for you to document your day, helping you gain perspectives, preserve memories, and foster personal growth. Start your journey of self-expression and reflection today.                           ',
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
    themeColor: '#00575C',
    manifest: '/manifest.json',
  }
}
