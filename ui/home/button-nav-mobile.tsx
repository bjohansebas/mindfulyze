'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { MenuItem } from './nav-mobile'

export function ButtonNav() {
  const { status } = useSession()

  return (
    <>
      {status === 'authenticated' ?
      (<MenuItem key="Dashboard">
      <Link
        href="/home"
        className="flex w-full font-semibold capitalize"
      >
        Dashboard
      </Link>
    </MenuItem>):
      (

          <>
            <MenuItem key="Login">
              <Link href="/login" className="flex w-full font-semibold capitalize">
                Log in
              </Link>
            </MenuItem>
            <MenuItem className="my-3 h-px w-full bg-gray-300" />

            <MenuItem key="Signup">
              <Link href="/signup" className="flex w-full font-semibold capitalize">
                Sign Up
              </Link>
            </MenuItem>
          </>
        )  }
    </>
  )
}

export default ButtonNav
