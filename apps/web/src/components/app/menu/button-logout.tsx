'use client'

import { useAptabase } from '@aptabase/react'
import { Button } from '@mindfulyze/ui'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function ButtonLogout() {
  const { trackEvent } = useAptabase()

  return (
    <Button
      variant="ghost"
      className="w-full justify-start"
      onClick={async () => {
        trackEvent('logout')

        await signOut({
          callbackUrl: '/login',
        })
      }}
    >
      <LogOutIcon className="h-4 w-4" />
      Logout
    </Button>
  )
}
