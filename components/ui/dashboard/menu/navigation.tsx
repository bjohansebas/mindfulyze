import { ButtonFeedBack } from './button-feedback'

import { Template } from '@/@types/template'
import { Logo, LogoType } from '@/components/shared/icons'
import { Skeleton } from '@/components/ui/skeleton'
import { ChatBubbleOvalLeftIcon } from '@heroicons/react/24/solid'
import { LayoutTemplateIcon, PenLineIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '../../button'
import { CreateThought } from '../thoughts/create-thoughts'

const NavigationMobile = dynamic(() => import('./navigation-mobile'), {
  loading: () => <Skeleton className="w-9 h-9 sm:hidden" />,
  ssr: false,
})

const UserDropdown = dynamic(() => import('./user-dropdown'), {
  loading: () => <Skeleton className="w-full h-9 hidden sm:flex" />,
  ssr: false,
})

export default function NavigationApp({ templates }: { templates: Template[] }) {
  return (
    <aside className="h-screen max-h-screen w-full sm:w-[300px] sm:max-w-[300px] bg-background p-4 border-b sm:border-b-0">
      <div className="flex justify-between items-center">
        <Link href="/home">
          <Logo className="text-primary-600 w-7 h-7 sm:hidden" />
          <LogoType className="mx-4 mb-5 text-primary-600 w-auto h-12 hidden sm:inline" />
        </Link>
        <NavigationMobile templates={templates} />
      </div>
      <nav className="sm:flex justify-between h-[calc(100%-68px)] w-full sm:flex-col hidden">
        <div className="space-y-2">
          <CreateThought templates={templates} />
          <Button variant="ghost" asChild className="justify-start w-[auto] sm:flex hidden">
            <Link className="sm:w-full" href="/home">
              <ChatBubbleOvalLeftIcon className="w-4 h-4 mr-2" />
              All thoughts
            </Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start sm:flex hidden">
            <Link className="w-full" href="/templates">
              <LayoutTemplateIcon className="w-4 h-4 mr-2" />
              Templates
            </Link>
          </Button>
        </div>
        <div className="sm:space-y-2 flex sm:flex-col">
          <div className="sm:flex hidden">
            <ButtonFeedBack />
          </div>
          <Button variant="ghost" asChild className="justify-start">
            <Link href="/changelog" className="w-full hidden sm:flex" target="_blank">
              <PenLineIcon className="w-4 h-4 mr-2" />
              Changelog
            </Link>
          </Button>
          <UserDropdown />
        </div>
      </nav>
    </aside>
  )
}
