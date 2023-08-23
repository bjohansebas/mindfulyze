'use client'

import { Analytics } from '@vercel/analytics/react'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'sonner'

type Props = {
  children?: React.ReactNode
}

export const Provider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Toaster closeButton />
      {children}
      <Analytics />
    </SessionProvider>
  )
}
