import { Button, Popover, PopoverContent, PopoverTrigger } from '@mindfulyze/ui'

import { authOptions } from '@/lib/auth'
import { stringAvatar } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { LayoutTemplateIcon, MessageCircleIcon, PenLineIcon, SettingsIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'

import Link from 'next/link'
import { ButtonLogout } from './menu/button-logout'

export default async function UserDropdown() {
  const session = await getServerSession(authOptions)

  return (
    <Popover>
      <PopoverTrigger className="h-9 w-9 py-0">
        <Avatar className="h-9 w-9">
          <AvatarImage src={`${session?.user.image}`} className="h-9 w-9" />
          <AvatarFallback>{stringAvatar(`${session?.user.name}`)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0 drop-shadow-lg" align="end">
        <div className="flex w-full flex-col space-y-px rounded-md p-3 sm:w-56">
          <div className="mb-2 p-2">
            {session?.user?.name && <p className="truncate font-bold">{session?.user?.name}</p>}
            <p className="truncate text-sm">{session?.user?.email}</p>
          </div>
          <Button variant="ghost" asChild className="w-auto justify-start md:hidden">
            <Link href="/home">
              <MessageCircleIcon className="h-4 w-4" />
              Thoughts
            </Link>
          </Button>
          <Button variant="ghost" asChild className="w-auto justify-start md:hidden">
            <Link href="/templates">
              <LayoutTemplateIcon className="h-4 w-4" />
              Templates
            </Link>
          </Button>
          <Button variant="ghost" asChild className="flex w-auto justify-start">
            <Link href="/settings">
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button variant="ghost" asChild className="flex w-auto justify-start">
            <Link href="/changelog" target="_blank">
              <PenLineIcon className="h-4 w-4" />
              Changelog
            </Link>
          </Button>
          <ButtonLogout />
        </div>
      </PopoverContent>
    </Popover>
  )
}
