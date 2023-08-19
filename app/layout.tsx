import './globals.css'

import { Analytics } from '@vercel/analytics/react'

import { Poppins } from 'next/font/google'

import { Toaster } from '@/ui/toaster'

import { constructMetadata } from '@/lib/metadata'
import { cn } from '@/lib/utils'
import { NextAuthProvider } from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata = constructMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={cn(poppins.variable)}>
        <NextAuthProvider>{children}</NextAuthProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
