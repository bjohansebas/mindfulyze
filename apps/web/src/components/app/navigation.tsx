import Link from 'next/link'
import { Suspense } from 'react'

import UserDropdown from '@ui/app/user-dropdown'
import { ButtonFeedBack } from '@ui/shared/button-feedback'

import { MindfulyzeIcon, MindfulyzeIconWithText, Skeleton } from '@mindfulyze/ui'
import { LinkNavigation } from './links-navigation'

export default function NavigationApp() {
  return (
    <nav className="flex w-full items-center justify-between border-b bg-card px-6 py-2 sm:px-12">
      <div className="flex items-center gap-4">
        <Link href="/home">
          <div className="py-2.5 md:hidden">
            <MindfulyzeIcon className="h-7 w-7 text-emerald-600" />
          </div>
          <MindfulyzeIconWithText className="hidden h-12 w-auto text-emerald-600 md:inline" />
        </Link>
        <div className="hidden gap-3 md:flex">
          <LinkNavigation />
        </div>
      </div>

      <div className="flex gap-3">
        <ButtonFeedBack />
        <Suspense fallback={<Skeleton className="h-9 w-9 rounded-full" />}>
          <UserDropdown />
        </Suspense>
      </div>
    </nav>
  )
}
