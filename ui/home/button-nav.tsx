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
        <Link
          href="/home"
          >
          Dashboard
        </Link>
          </Button>
      ) : (
        <>
          <Link
            href="/login"
            className="animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
          >
            Log in
          </Link>
          <Button className='rounded-full' asChild>
            <Link href="/signup">
              Sign Up
            </Link>
          </Button>
        </>
      )}
    </>
  )
}

export default ButtonNav
