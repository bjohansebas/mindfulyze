'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string
    title: string
    icon: JSX.Element
  }[]
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn('grid  gap-2', className)} {...props}>
      {items.map((item) => (
        <Button asChild key={item.href} variant="ghost" className="justify-start">
          <Link
            href={item.href}
            className={cn(
              pathname === item.href ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline',
              'justify-start',
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
