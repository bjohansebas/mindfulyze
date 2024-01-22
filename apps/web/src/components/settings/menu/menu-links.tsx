'use client'

import { ButtonFeedBack } from '@/components/dashboard/menu/button-feedback'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { stringAvatar } from '@/lib/utils'

import { ChatBubbleOvalLeftIcon, Cog6ToothIcon } from '@heroicons/react/24/solid'
import { LayoutTemplateIcon, LogOut, PenLineIcon } from 'lucide-react'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function MenuLinks() {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Avatar className="h-7 w-7">
            <AvatarImage src={`${session?.user.image}`} className="h-7 w-7" />
            <AvatarFallback>{stringAvatar(`${session?.user.name}`)}</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col justify-between h-full">
          <SheetHeader>
            <SheetTitle>{session?.user?.name}</SheetTitle>
            <SheetDescription>{session?.user?.email}</SheetDescription>
          </SheetHeader>
          <nav className="flex justify-between h-full w-full flex-col mt-4 space-y-2">
            <div className="space-y-2">
              <Button variant="ghost" asChild className="justify-start w-[auto] flex" onClick={() => setOpen(false)}>
                <Link className="w-full" href="/home">
                  <ChatBubbleOvalLeftIcon className="w-4 h-4 mr-2" />
                  All thoughts
                </Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start flex" onClick={() => setOpen(false)}>
                <Link className="w-full" href="/templates">
                  <LayoutTemplateIcon className="w-4 h-4 mr-2" />
                  Templates
                </Link>
              </Button>
            </div>
            <div className="space-y-2 flex flex-col">
              <ButtonFeedBack setOpen={setOpen} />
              <Button variant="ghost" asChild className="justify-start" onClick={() => setOpen(false)}>
                <Link href="/settings" className="w-full flex">
                  <Cog6ToothIcon className="w-4 h-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button variant="ghost" asChild className="justify-start" onClick={() => setOpen(false)}>
                <Link href="/changelog" className="w-full flex" target="_blank">
                  <PenLineIcon className="w-4 h-4 mr-2" />
                  Changelog
                </Link>
              </Button>
              <Button
                className="w-full justify-start"
                onClick={() => {
                  setOpen(false)
                  signOut({
                    callbackUrl: '/login',
                  })
                }}
                variant="ghost"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
