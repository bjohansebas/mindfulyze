import '@/styles/globals.css'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import type { Viewport } from 'next'

import { AptabaseProvider } from '@aptabase/react'
import { APTABASE_APP_KEY, cn, constructMetadata } from '@mindfulyze/utils'
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
      <body className={cn('dark:selection:bg-emerald-800 antialiased', GeistSans.className, GeistMono.className)}>
        <AptabaseProvider appKey={APTABASE_APP_KEY}>
          <Provider>{children}</Provider>
        </AptabaseProvider>
      </body>
    </html>
  )
}
