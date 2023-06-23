import { AppProvider } from '@/context/appContext'
import { Outlet } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

function MainPage (): JSX.Element {
  return (
    <AppProvider>
      <Outlet />
      <Analytics />
    </AppProvider>
  )
}

export { MainPage }
