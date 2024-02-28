'use client'

import { useAptabase } from '@aptabase/react'
import { Button, GoogleIcon, Skeleton } from '@mindfulyze/ui'

import { signIn } from 'next-auth/react'
import { usePathname, useSearchParams } from 'next/navigation'

export function OAuthForm() {
  const searchParams = useSearchParams()
  const { trackEvent } = useAptabase()
  const pathname = usePathname()
  const next = searchParams?.get('next')

  return (
    <Button
      onClick={() => {
        trackEvent(pathname === '/login' ? 'sign in' : 'sign up')
        signIn('google', {
          ...(next && next.length > 0 ? { callbackUrl: next } : {}),
        })
      }}
      className="w-full"
      size="lg"
    >
      <GoogleIcon className="w-5 h-5" />
      Continue with Google
    </Button>
  )
}

export function OAuthFormPlaceholder() {
  return <Skeleton className="w-full h-10" />
}
