import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function NoRequiredAuth () {
  const { credentials, userId } = useAuth()

  if (credentials && userId) {
    return <Navigate to='/dashboard' />
  }

  return <Outlet />
}

export { NoRequiredAuth }
