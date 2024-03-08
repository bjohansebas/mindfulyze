'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'

import { useAptabase } from '@aptabase/react'

import { Button } from '@mindfulyze/ui'
import { MenuItem } from './nav-mobile'

export function ButtonNav() {
  const { status } = useSession()
  const { trackEvent } = useAptabase()

  return status === 'authenticated' ? (
    <MenuItem key="Dashboard">
      <Link href="/home" className="flex w-full font-semibold capitalize">
        Dashboard
      </Link>
    </MenuItem>
  ) : (
    <>
      <MenuItem key="Login">
        <Button
          className="h-6 w-full justify-normal p-0 font-semibold text-base text-white capitalize hover:text-emerald-600 hover:no-underline"
          variant="link"
          onClick={() => {
            trackEvent('sign in mobile')
            signIn('google', { callbackUrl: '/home' })
          }}
        >
          Log in
        </Button>
      </MenuItem>
      <MenuItem className="my-3 h-px w-full bg-gray-300" />
      <MenuItem key="Signup">
        <Button
          className="h-6 w-full justify-normal p-0 font-semibold text-base text-white capitalize hover:text-emerald-600 hover:no-underline"
          variant="link"
          onClick={() => {
            trackEvent('sign up mobile')
            signIn('google', { callbackUrl: '/home' })
          }}
        >
          Sign Up
        </Button>
      </MenuItem>
    </>
  )
}

export default ButtonNav
