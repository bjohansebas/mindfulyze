import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'

import { Link, useNavigate } from 'react-router-dom'

import { Banner } from '@/components/Banner'
import { useApp } from '@/hooks/useApp'
import Layout from './layout'

export const LogoutPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { logoutAction } = useApp()

  const cancelAction = (): void => {
    navigate('/')
  }

  return (
    <Layout>
      <div className='min-h-screen w-full flex bg-gradient-to-r from-main-900 to-main-950 justify-center items-center flex-col'>
        <header className='absolute top-6 text-white'>
          <Link to='/'>
            <Banner widthText={260} heightText={26.96} widthFavicon={50} />
          </Link>
        </header>
        <section className='flex flex-col items-center gap-6 text-main-50'>
          <ArrowLeftOnRectangleIcon className='w-16 h-16' />
          <h1 className='font-bold text-center md:text-2xl'>Are you sure you want to sign out?</h1>
          <div className='flex gap-3 w-full items-center'>
            <button
              type='button'
              onClick={logoutAction}
              className='w-full border-white bg-white text-black border p-2 rounded-lg hover:bg-slate-300 backdrop-blur-md hover:text-black transition duration-300'
            >
              Log out
            </button>
            <button
              type='button'
              className='w-full border-white border p-2 rounded-lg hover:bg-slate-300 hover:text-black transition duration-300'
              onClick={cancelAction}
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </Layout>
  )
}

export default LogoutPage
