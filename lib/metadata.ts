import { Metadata } from 'next'
import { HOME_DOMAIN } from './constants'

export function constructMetadata({
  title = 'Mindfulyze - Web application for tracking emotions and thoughts',
  description = 'Mindfulyze is a web application for tracking emotions and thoughts. The application was created with the goal of helping you reflect on your emotions and thoughts, and keep a record of them in a simple and organized way.',
  image = `${HOME_DOMAIN}/_static/thumbnail.png`,
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
