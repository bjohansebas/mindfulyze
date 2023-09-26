'use client'

import { ButtonFeedBack } from './button-feedback'

import UserDropdown from './user-dropdown'

import { Template } from '@/@types/template'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import { LayoutTemplateIcon, PenLineIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../../button'
// import { LogoType } from '@/components/shared/icons'
import { CreateThought } from '../thoughts/create-thoughts'

export default function NavigationApp({ templates }: { templates: Template[] }) {
  const pathname = usePathname()
  return (
    <aside className="sticky top-0 h-screen w-full sm:w-[300px] bg-background p-4">
      {/* <div className="mb-4">
        <Link href="/home">
          <LogoType className="h-auto w-32 text-primary-600" />
        </Link>
      </div> */}
      <nav className="flex justify-between h-full w-full flex-col">
        <div className="space-y-2">
          {pathname === '/home' ? <CreateThought templates={templates} /> : null}
          <Button variant="ghost" asChild className="justify-start w-[auto]">
            <Link
              className={`${pathname === '/home' ? 'text-primary-600 hover:text-primary-600' : ''} sm:w-full `}
              href="/home"
            >
              <ChatBubbleOvalLeftIcon className="w-4 h-4 mr-2" />
              All thoughts
            </Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start">
            <Link
              className={`${pathname === '/templates' ? 'text-primary-600 hover:text-primary-600' : ''}  w-full `}
              href="/templates"
            >
              <LayoutTemplateIcon className="w-4 h-4 mr-2" />
              Templates
            </Link>
          </Button>
        </div>
        <div className="space-y-2">
          <div className="sm:flex hidden">
            <ButtonFeedBack />
          </div>
          <Button variant="ghost" asChild className="justify-start">
            <Link href="/changelog" className="w-full hidden sm:flex" target="_blank">
              <PenLineIcon className="w-4 h-4 mr-2" />
              Changelog
            </Link>
          </Button>
          {/* <MenuLinks/> */}
          {/* <button
                  onClick={() => setShowCMDK(true)}
                  className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 md:block"
                  >
                  Help
                </button> */}
          <UserDropdown />
        </div>
      </nav>
    </aside>
  )
}
