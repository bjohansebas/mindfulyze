import Link from 'next/link'
import { Suspense } from 'react'

import { Logo, LogoType } from '@/components/shared/icons'
import UserDropdown from '@ui/app/user-dropdown'
import { ButtonFeedBack } from '@ui/shared/button-feedback'
import { CreateThought } from '@ui/shared/create-thoughts'
import { Skeleton } from '@ui/skeleton'

import { LinkNavigation } from './links-navigation'

export default function NavigationApp() {
  return (
    <nav className="w-full bg-card px-2 sm:px-12 py-2 border-b flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link href="/home">
          <div className="py-2.5 sm:hidden">
            <Logo className="text-emerald-600 w-7 h-7 " />
          </div>
          <LogoType className="text-emerald-600 w-auto h-12 hidden sm:inline" />
        </Link>
        <div className="sm:flex gap-3 hidden">
          <LinkNavigation />
        </div>
      </div>

      <div className="flex gap-3">
        <Suspense fallback={<Skeleton className="rounded-full w-[180px] h-9" />}>
          <CreateThought />
        </Suspense>
        <div className="sm:flex hidden">
          <ButtonFeedBack />
        </div>
        <Suspense fallback={<Skeleton className="rounded-full w-9 h-9" />}>
          <UserDropdown />
        </Suspense>
      </div>
    </nav>
  )
}
