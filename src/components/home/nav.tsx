import { LogoType } from '@/components/shared/icons'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import Link from 'next/link'
// import { useSelectedLayoutSegment } from 'next/navigation'

const ButtonNav = dynamic(() => import('./button-nav'), {
  loading: () => <Skeleton className="w-[119.5px] h-9" />,
})

export const navItems = [
  // {
  //   name: 'Pricing',
  //   slug: 'pricing',
  // },
  // {
  //   name: 'Home',
  //   slug: 'home',
  //   isPrivate: true,
  // },
  {
    name: 'Changelog',
    slug: 'changelog',
  },
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
  // const selectedLayout = useSelectedLayoutSegment()
  // const helpCenter = selectedLayout === 'help'

  return (
    <nav className="sticky inset-x-0 top-0 z-30 w-full transition-all border-b bg-card backdrop-blur-lg">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <LogoType className="w-auto h-10 text-primary-600" />
            </Link>
            <div className="hidden items-center space-x-3 lg:flex">
              {navItems.map(({ name, slug }) => {
                return (
                  <Link
                    id={`nav-${slug}`}
                    key={slug}
                    href={`/${slug}`}
                    className="z-10 rounded-full px-4 py-1.5 text-sm font-medium capitalize"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="hidden lg:flex gap-2">
            <ButtonNav />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}