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
    <nav className="item-center mx-auto flex h-20 w-full max-w-5xl justify-between px-8 lg:h-24">
      <div className="flex items-center gap-4">
        <Link href="/">
          <MindfulyzeIconWithText className="h-12 w-auto text-emerald-600" />
        </Link>
        <div className="hidden items-center space-x-3 lg:flex">
          {navItems.map(({ name, slug }) => {
            return (
              <Link
                id={`nav-${slug}`}
                key={slug}
                href={`/${slug}`}
                className="px-4 font-medium text-sm capitalize hover:hover:text-primary"
              >
                {name}
              </Link>
            )
          })}
        </div>
      </div>
      <div className="hidden items-center gap-2 lg:flex">
        <ButtonNav />
      </div>
      <MobileNav />
    </nav>
  )
}
