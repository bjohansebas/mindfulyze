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
    <div className="relative inline-block">
      <Popover>
        <PopoverTrigger asChild>
          <button type="button" className="group relative">
            <Avatar>
              <AvatarImage
                src={`${session?.user.image}`}
                className="h-9 w-9 transition-all duration-75 group-focus:outline-none group-active:scale-95 sm:h-10 sm:w-10"
              />
              <AvatarFallback>{stringAvatar(`${session?.user.name}`)}</AvatarFallback>
            </Avatar>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex w-full flex-col gap-3 rounded-md bg-white p-3 sm:w-56">
            <div className="p-2">
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-gray-900">{session?.user?.name}</p>
              )}
              <p className="truncate text-sm text-gray-500">{session?.user?.email}</p>
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
            {/* <Link
              href="/changelog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full justify-between rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu text="Changelog" icon={<Edit3 className="h-4 w-4" />} />
            </Link> */}
            <Button
              className="w-full rounded-md text-sm"
              onClick={() => {
                signOut({
                  callbackUrl: '/login',
                })
                // track logout event
              }}
            >
              <Logout className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
