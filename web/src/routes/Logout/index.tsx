import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'

export function LogoutPage (): JSX.Element {
  const { logoutAction } = useAuth()
  useEffect(() => {
    logoutAction()
  }, [])
  return (
    <Navigate to="/login"></Navigate>
  )
}
