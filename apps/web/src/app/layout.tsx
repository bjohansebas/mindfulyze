import './globals.css'

import { AppProvider } from '@/context/appContext'
import { Analytics } from '@vercel/analytics/react'
import { Outlet } from 'react-router-dom'

export const Layout = (): JSX.Element => {
  return (
    <AppProvider>
      <Outlet />
      <Analytics />
    </AppProvider>
  )
}

export default Layout
