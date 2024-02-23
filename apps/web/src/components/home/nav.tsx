import { MindfulyzeIconWithText } from '@mindfulyze/ui'

import Link from 'next/link'
import ButtonNav from './button-nav'
import MobileNav from './nav-mobile'

export const navItems = [
  {
    name: 'Changelog',
    slug: 'changelog',
  },
]

export default function Navigation() {
  return (
    <nav className="w-full max-w-5xl mx-auto px-8 lg:h-24 h-20 flex item-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/">
          <MindfulyzeIconWithText className="w-auto h-12 text-emerald-600" />
        </Link>
        <div className="hidden items-center space-x-3 lg:flex">
          {navItems.map(({ name, slug }) => {
            return (
              <Link
                id={`nav-${slug}`}
                key={slug}
                href={`/${slug}`}
                className="px-4 text-sm font-medium capitalize hover:hover:text-primary"
              >
                {name}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="hidden lg:flex gap-2 items-center">
        <ButtonNav />
      </div>
      <MobileNav />
    </nav>
  )
}
