'use client'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'

type Props = {
  children?: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Toaster closeButton theme="dark" richColors={true} />
      {children}
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  )
}
