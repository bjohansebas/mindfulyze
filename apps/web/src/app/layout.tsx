import '@/styles/globals.css'

import { GeistMono, GeistSans } from 'geist/font'
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
    <html lang="en">
      <body className={cn('dark font-sans', GeistSans.variable, GeistMono.variable)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
