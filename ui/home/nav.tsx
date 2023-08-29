'use client'

import { LogoType } from '@/components/shared/icons'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { cn } from '@/lib/utils'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

export const navItems = [
  // {
  //   name: 'Pricing',
  //   slug: 'pricing',
  // },
  {
    name: 'Home',
    slug: 'home',
    isPrivate: true,
  },
  // {
  //   name: 'Changelog',
  //   slug: 'changelog',
  //   isPrivate: false,
  // },
  // {
  //   name: 'Blog',
  //   slug: 'blog',
  //   isPrivate: false,
  // },
  // {
  //   name: 'Help',
  //   slug: 'help',
  //   isPrivate: false,
  // },
]

export default function Nav() {
  const selectedLayout = useSelectedLayoutSegment()
  const helpCenter = selectedLayout === 'help'

  const { status } = useSession()

  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-white/75 backdrop-blur-lg">
      <MaxWidthWrapper
        {...(helpCenter && {
          className: 'max-w-screen-lg',
        })}
      >
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={'/'}>
              <LogoType className="w-auto h-10" />
            </Link>
            {helpCenter && (
              <div className="flex items-center">
                <div className="mr-3 h-5 border-l-2 border-gray-400" />
                <Link href="/help" className="font-display text-lg font-bold text-gray-700">
                  Help Center
                </Link>
              </div>
            )}
            {!helpCenter && (
              <div className="hidden items-center space-x-3 lg:flex">
                {navItems.map(({ name, slug, isPrivate }) => {
                  if (!isPrivate || (isPrivate && status === 'authenticated')) {
                    return (
                      <Link
                        id={`nav-${slug}`}
                        key={slug}
                        href={`/${slug}`}
                        className={cn(
                          'z-10 rounded-full px-4 py-1.5 text-sm font-medium capitalize text-gray-500 transition-colors ease-out hover:text-black',
                          {
                            'text-black': selectedLayout === slug,
                          },
                        )}
                      >
                        {name}
                      </Link>
                    )
                  }
                })}
              </div>
            )}
          </div>
          <div className="hidden lg:block">
            {status === 'unauthenticated' ? (
              <>
                <Link
                  href="/login"
                  className="animate-fade-in rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors ease-out hover:text-black"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="animate-fade-in rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black"
                >
                  Sign Up
                </Link>
              </>
            ) : null}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
