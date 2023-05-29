import { AppProvider } from '@/context/appContext'
import { Outlet } from 'react-router-dom'

function MainPage (): JSX.Element {
  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  )
}

export { MainPage }
