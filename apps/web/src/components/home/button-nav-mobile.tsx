'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

import { Button } from '@ui/button'
import { MenuItem } from './nav-mobile'

export function ButtonNav() {
  const { status } = useSession()

  return (
    <>
      {status === 'authenticated' ? (
        <MenuItem key="Dashboard">
          <Link href="/home" className="flex w-full font-semibold capitalize">
            Dashboard
          </Link>
        </MenuItem>
      ) : (
        <>
          <MenuItem key="Login">
            <Button
              className="capitalize p-0 h-6 w-full font-semibold text-base justify-normal text-white hover:text-emerald-600 hover:no-underline"
              variant="link"
              onClick={() => {
                signIn('google', { callbackUrl: '/home' })
              }}
            >
              Log in
            </Button>
          </MenuItem>
          <MenuItem className="my-3 h-px w-full bg-gray-300" />
          <MenuItem key="Signup">
            <Button
              className="capitalize p-0 h-6 w-full font-semibold text-base justify-normal text-white hover:text-emerald-600 hover:no-underline"
              variant="link"
              onClick={() => {
                signIn('google', { callbackUrl: '/home' })
              }}
            >
              Sign Up
            </Button>
          </MenuItem>
        </>
      )}
    </>
  )
}

export default ButtonNav
