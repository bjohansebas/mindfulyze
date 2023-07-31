import { ArrowLeftOnRectangleIcon, HomeIcon, UserIcon } from '@heroicons/react/24/outline'

import { Menu, Transition } from '@headlessui/react'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import { Banner } from '@/components/Banner'
import { Fragment } from 'react'
import { ListNavigationLogged } from './listMenu'

const routes = [
  {
    text: <FormattedMessage id='menu.list.dashboard' defaultMessage='Home' />,
    route: '/',
    icon: <HomeIcon />,
  },
]

export const MenuLogged = (): JSX.Element => {
  return (
    <nav className='h-16 w-screen flex justify-around py-[6px] px-10 min-[400px]:border-b-2  items-center z-50 max-[400px]:fixed max-[400px]:bottom-0 bg-white'>
      <Link to='/' className='text-main-800 max-[400px]:hidden'>
        <Banner />
      </Link>
      <div className='flex gap-4 font-semibold text-sm text-slate-700 items-center'>
        <ListNavigationLogged listRoutes={routes} />
        <Menu as='div' className='relative inline-block text-left z-10'>
          <Menu.Button className='justify-center items-center py-2 hover:text-main-900'>
            <UserIcon className='h-6 w-6' aria-hidden='true' />
            <span className='max-[400px]:inline-block hidden'>
              <FormattedMessage id='menu.account.profile' defaultMessage='Profile' />
            </span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='absolute right-0 mt-2 w-56 max-[400px]:bottom-16 max-[400px]:left-0 min-[400px]:origin-top-right max-[400px]:origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='px-1 py-1 '>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/account'
                      className={`${
                        active ? 'text-main-700' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <UserIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                      Account
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to='/logout'
                      className={`${
                        active ? 'text-main-700' : 'text-gray-900'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      <ArrowLeftOnRectangleIcon className='mr-2 h-5 w-5' aria-hidden='true' />
                      Log out
                    </Link>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  )
}

export default MenuLogged
