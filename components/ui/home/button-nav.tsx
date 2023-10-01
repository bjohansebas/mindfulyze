'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../button'

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
          <Button asChild variant="ghost">
            <Link href="/login">Log in</Link>
          </Button>
          <Button className="rounded-full" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </>
      )}
    </>
  )
}

export default ButtonNav
