import { Outlet, redirect } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function RequiredAuth () {
  const { credentials } = useAuth()

  if (!credentials) {
    return redirect('/login')
  }
  return <Outlet />
}

export { RequiredAuth }
