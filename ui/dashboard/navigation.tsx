import Logo from '@/components/shared/icons/logo'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import UserDropdown from './userDropdown'

import Link from 'next/link'

export default function NavigationApp() {
  return (
    <div className='w-full bg-white'>
      <div className='sticky left-0 right-0 top-0 z-20 border-b border-gray-200 bg-white'>
        <MaxWidthWrapper>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <Link href='/home'>
                <Logo className='h-8 w-8 transition-all duration-75 active:scale-95' />
              </Link>
            </div>
            <div className='flex items-center space-x-6'>
              {/* <Link
                  href="/changelog"
                  className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 md:block"
                  target="_blank"
                >
                  Changelog
                </Link> */}
              {/* <button
                  onClick={() => setShowCMDK(true)}
                  className="hidden text-sm text-gray-500 transition-colors hover:text-gray-700 md:block"
                >
                  Help
                </button> */}
              <UserDropdown />
            </div>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  )
}
