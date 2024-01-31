'use client'

import { buttonVariants } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'
import {} from '@ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { name: 'Thoughts', href: '/home' },
  { name: 'Templates', href: '/templates' },
]

export function LinkNavigation() {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={cn(buttonVariants({ variant: 'link' }), {
            'text-card-muted': pathname !== link.href,
          })}
        >
          {link.name}
        </Link>
      ))}
    </>
  )
}
