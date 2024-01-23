'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

import { Button } from '@mindfulyze/ui'

export function ButtonNav() {
  const { status } = useSession()

  return (
    <>
      {status === 'authenticated' ? (
        <Button asChild>
          <Link href="/home">Dashboard</Link>
        </Button>
      ) : (
        <>
          <Button
            variant="ghost"
            className="rounded-full"
            onClick={() => {
              signIn('google', { callbackUrl: '/home' })
            }}
          >
            Log in
          </Button>
          <Button
            className="rounded-full"
            onClick={() => {
              signIn('google', { callbackUrl: '/home' })
            }}
          >
            Sign Up
          </Button>
        </>
      )}
    </>
  )
}

export default ButtonNav
