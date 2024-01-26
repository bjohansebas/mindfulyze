import { Logo } from '@/components/shared/icons'
import { Skeleton } from '@/components/ui/skeleton'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const MenuLinks = dynamic(() => import('./menu-links'), {
  loading: () => <Skeleton className="w-9 h-9 sm:hidden" />,
  ssr: false,
})

export default function NavigationSettings() {
  return (
    <nav className="w-full bg-card border-b flex justify-between p-4 items-center">
      <Link href="/home">
        <Logo className="text-emerald-600 w-7 h-7" />
      </Link>
      <MenuLinks />
    </nav>
  )
}
