import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mindfulyze',
    short_name: 'Mindfulyze',
    lang: 'en',
    start_url: '/',
    display: 'standalone',
    background_color: '#020a08',
    theme_color: '#00d176',
    icons: [
      {
        src: '/favicon.ico',
        type: 'image/x-icon',
        sizes: '16x16 32x32',
      },
      {
        src: '/_static/favicons/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
      {
        src: '/_static/favicons/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
      },
      {
        src: '/_static/favicons/icon-192-maskable.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'maskable',
      },
      {
        src: '/_static/favicons/icon-512-maskable.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'maskable',
      },
    ],
  }
}
