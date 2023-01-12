import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function MainPage () {
  const { credentials } = useAuth()

  return credentials ?? <Navigate to="/login" replace />
}

export { MainPage }
