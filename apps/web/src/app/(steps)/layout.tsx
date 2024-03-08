import { MindfulyzeIcon, Skeleton } from '@mindfulyze/ui'
import UserDropdown from '@ui/app/user-dropdown'
import Link from 'next/link'
import { Suspense } from 'react'

export default function StepsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="-z-10 fixed top-0 left-0 h-svh w-full">
        <div className="relative h-svh w-full bg-background">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_500px_at_50%_200px,#22282f,transparent)]" />
        </div>
      </div>
      <div className="fixed top-8 right-10">
        <Suspense fallback={<Skeleton className="h-9 w-9 rounded-full" />}>
          <UserDropdown />
        </Suspense>
      </div>
      <div className="fixed top-8 left-10">
        <Link href="/home">
          <MindfulyzeIcon className="h-9" />
        </Link>
      </div>
      <main>{children}</main>
    </div>
  )
}
