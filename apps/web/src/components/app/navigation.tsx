import Link from 'next/link'
import { Suspense } from 'react'

import { Logo, LogoType } from '@/components/shared/icons'
import UserDropdown from '@ui/app/user-dropdown'
import { ButtonFeedBack } from '@ui/shared/button-feedback'
import { CreateThought } from '@ui/shared/thoughts/create-thoughts'
import { Skeleton } from '@ui/skeleton'

import { LinkNavigation } from './links-navigation'

export default function NavigationApp() {
  return (
    <nav className="w-full bg-card px-6 sm:px-12 py-2 border-b flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/home">
          <div className="py-2.5 md:hidden">
            <Logo className="text-emerald-600 w-7 h-7" />
          </div>
          <LogoType className="text-emerald-600 w-auto h-12 hidden md:inline" />
        </Link>
        <div className="md:flex gap-3 hidden">
          <LinkNavigation />
        </div>
      </div>

      <div className="flex gap-3">
        <ButtonFeedBack />
        <Suspense fallback={<Skeleton className="rounded-full w-9 h-9" />}>
          <UserDropdown />
        </Suspense>
      </div>
    </nav>
  )
}
