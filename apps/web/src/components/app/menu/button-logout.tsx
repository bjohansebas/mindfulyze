'use client'

import { useAptabase } from '@aptabase/react'
import { signOut } from '@lib/actions/auth'
import { Button } from '@mindfulyze/ui'
import { LogOutIcon } from 'lucide-react'

export function ButtonLogout() {
  const { trackEvent } = useAptabase()

  return (
    <form action={signOut}>
      <Button
        variant="ghost"
        className="w-full justify-start"
        onClick={async () => {
          trackEvent('logout')
        }}
      >
        <LogOutIcon className="h-4 w-4" />
        Logout
      </Button>
    </form>
  )
}
