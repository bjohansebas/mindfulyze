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
          <Link
            href="/signup"
            className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
          >
            Sign Up
          </Link>
        </>
      )}
    </>
  )
}

export default ButtonNav
