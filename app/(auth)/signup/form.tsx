'use client'

import { useSearchParams } from 'next/navigation'

import Google from '@/components/shared/icons/google'
import { Button } from '@/ui/button'
import { signIn } from 'next-auth/react'

export function SignUpForm() {
  const searchParams = useSearchParams()
  const next = searchParams?.get('next')

  return (
    <div>
      <Button
        onClick={() => {
          signIn('google', {
            ...(next && next.length > 0 ? { callbackUrl: next } : {}),
          })
        }}
        className='w-full'
        size='lg'
      >
        <Google className='mr-2 h-4 w-4' /> Continue with Google
      </Button>
    </div>
  )
}
