'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '../ui/button'

export function ButtonNav() {
  const { status } = useSession()

  return (
    <>
      {status === 'authenticated' ? (
        <Button asChild>
          <a href="/home">Dashboard</a>
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
