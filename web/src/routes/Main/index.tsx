import { AppProvider } from '@/context/appContext'
import { Analytics } from '@vercel/analytics/react'
import { Outlet } from 'react-router-dom'

function MainPage(): JSX.Element {
  return (
    <AppProvider>
      <Outlet />
      <Analytics />
    </AppProvider>
  )
}

export { MainPage }
