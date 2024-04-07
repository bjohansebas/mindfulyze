'use client'

import { Toaster } from '@mindfulyze/ui'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

type Props = {
  children?: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <>
      <Toaster />
      {children}
      <Analytics />
      <SpeedInsights />
    </>
  )
}
