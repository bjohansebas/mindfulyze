import Link from 'next/link'

import { signIn } from '@lib/actions/auth'
import { Button } from '@mindfulyze/ui'
import type { Session } from 'next-auth'
import { MenuItem } from './nav-mobile'

export function ButtonsNavMobile({ session }: { session: Session | null }) {
  return session?.user != null ? (
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
            signIn()
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
            signIn()
          }}
        >
          Sign Up
        </Button>
      </MenuItem>
    </>
  )
}

export default ButtonsNavMobile
