'use client'

import { Toaster } from '@mindfulyze/ui'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'

type Props = {
  children?: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  )
}
