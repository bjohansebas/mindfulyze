'use client'

import { Template } from '@/@types/template'
import { stringAvatar } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/ui/sheet'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import { LayoutTemplateIcon, LogOut, PenLineIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../../button'
import { CreateThought } from '../thoughts/create-thoughts'
import { ButtonFeedBack } from './button-feedback'

export default function NavigationMobile({ templates }: { templates: Template[] }) {
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="sm:hidden" size="icon">
          <Avatar className="h-7 w-7 sm:mr-2">
            <AvatarImage src={`${session?.user.image}`} className="h-7 w-7" />
            <AvatarFallback>{stringAvatar(`${session?.user.name}`)}</AvatarFallback>
          </Avatar>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{session?.user?.name}</SheetTitle>
          <SheetDescription>{session?.user?.email}</SheetDescription>
        </SheetHeader>
        <nav className="flex justify-between h-[calc(100%-60px)] w-full flex-col mt-4">
          <div className="space-y-2">
            <CreateThought templates={templates} setOpen={setOpen} />
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
      </SheetContent>
    </Sheet>
  )
}
