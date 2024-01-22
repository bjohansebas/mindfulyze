'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { stringAvatar } from '@/lib/utils'
import { ArrowLeftOnRectangleIcon as Logout, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { PenLineIcon } from 'lucide-react'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function UserDropdown() {
  const { data: session } = useSession()

  return (
    <Popover>
      <PopoverTrigger asChild className="h-9 w-9 sm:w-full sm:w-max-[300px] py-0">
        <Button className="sm:justify-start" variant="ghost">
          <Avatar className="h-5 w-5 sm:mr-2">
            <AvatarImage src={`${session?.user.image}`} className="h-5 w-5" />
            <AvatarFallback>{stringAvatar(`${session?.user.name}`)}</AvatarFallback>
          </Avatar>
          <p className="truncate">{session?.user?.name}</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto drop-shadow-lg p-0" align="center">
        <div className="flex w-full flex-col space-y-px rounded-md p-3 sm:w-56">
          <div className="p-2">
            {session?.user?.name && <p className="truncate font-bold">{session?.user?.name}</p>}
            <p className="truncate text-sm">{session?.user?.email}</p>
          </div>
          <Button variant="ghost" asChild className="justify-start w-[auto] flex">
            <Link href="/settings">
              <Cog6ToothIcon className="w-4 h-4 mr-2" />
              Settings
            </Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start w-[auto] flex">
            <Link href="/changelog" target="_blank">
              <PenLineIcon className="w-4 h-4 mr-2" />
              Changelog
            </Link>
          </Button>
          <Button
            onClick={() => {
              signOut({
                callbackUrl: '/login',
              })
            }}
            variant="ghost"
            className='justify-start w-[auto] flex"'
          >
            <Logout className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
