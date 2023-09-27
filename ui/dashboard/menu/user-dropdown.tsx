'use client'

import { stringAvatar } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Button } from '@/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { ArrowLeftOnRectangleIcon as Logout } from '@heroicons/react/24/solid'

import { signOut, useSession } from 'next-auth/react'

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
        <div className="flex w-full flex-col gap-3 rounded-md p-3">
          <div className="p-2">
            {session?.user?.name && <p className="truncate font-bold">{session?.user?.name}</p>}
            <p className="truncate text-sm">{session?.user?.email}</p>
          </div>
          {/* <button
              className="w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
              onClick={() => {
                setShowCMDK(true)
                setOpenPopover(false)
              }}
            > 
              <IconMenu text="Help Center" icon={<HelpCircle className="h-4 w-4" />} />
            </button> */}
          {/* <Link
              href="/settings"
              className="block w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu text="Settings" icon={<Settings className="h-4 w-4" />} />
            </Link> */}
          <div className="flex w-full flex-col gap-2">
            <Button
              className="w-full rounded-md text-sm justify-start text-red-500"
              onClick={() => {
                signOut({
                  callbackUrl: '/login',
                })
              }}
              variant="outline"
            >
              <Logout className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
