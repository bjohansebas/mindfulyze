'use client'

import { useSearchParams } from 'next/navigation'

import Google from '@/components/shared/icons/google'
import { Button } from '@/ui/button'
import { useToast } from '@/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useEffect } from 'react'

export function LoginForm() {
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const next = searchParams?.get('next')

  useEffect(() => {
    const error = searchParams?.get('error')
    if (error) {
      toast({ description: error, variant: 'destructive' })
    }
  }, [searchParams])

  return (
    <div>
      <Button
        onClick={() => {
          signIn('google', {
            ...(next && next.length > 0 ? { callbackUrl: next } : { callbackUrl: '/home' }),
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
