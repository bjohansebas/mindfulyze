import { auth } from '@lib/auth'
import { Toaster } from '@mindfulyze/ui'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'

type Props = {
  children?: React.ReactNode
}

export const Provider = async ({ children }: Props) => {
  const session = await auth()

  return (
    <SessionProvider session={session}>
      <Toaster />
      {children}
      <Analytics />
      <SpeedInsights />
    </SessionProvider>
  )
}
