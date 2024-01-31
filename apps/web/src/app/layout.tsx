import '@/styles/globals.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { Viewport } from 'next'

import { cn, constructMetadata } from '@mindfulyze/utils'
import { Provider } from './providers'

export const metadata = constructMetadata()

export const viewport: Viewport = {
  themeColor: '#00cf76',
  colorScheme: 'dark',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={cn('bg-background dark:selection:bg-emerald-800', GeistSans.className, GeistMono.className)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
