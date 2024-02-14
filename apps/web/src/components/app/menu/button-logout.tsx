'use client'

import { Button } from '@mindfulyze/ui'
import { LogOutIcon } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function ButtonLogout() {
  return (
    <Button
      variant="ghost"
      className="justify-start w-full"
      onClick={async () => {
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
