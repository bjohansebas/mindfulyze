import './globals.css'

import { Analytics } from '@vercel/analytics/react'

import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'

import { Toaster } from '@/components/ui/toaster'

import { cn } from '@/lib/utils'
import Head from 'next/head'
import { NextAuthProvider } from './providers'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Mindfulyze',
  description:
    'Mindfulyze is a web application for tracking emotions and thoughts. The application was created with the goal of helping you reflect on your emotions and thoughts, and keep a record of them in a simple and organized way.',
  icons: {
    apple: '/_static/favicons/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

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
