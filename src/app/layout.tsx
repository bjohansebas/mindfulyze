import '@/styles/globals.css'

import { GeistMono, GeistSans } from 'geist/font'
import { Viewport } from 'next'

import { constructMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
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
      <body className={cn('font-sans', GeistSans.variable, GeistMono.variable)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
