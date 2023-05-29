import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from 'hooks/useAuth'

export function SignLayoutPage (): JSX.Element {
  const navigate = useNavigate()
  const { credential, userId } = useAuth()

  useEffect(() => {
    if ((credential != null) && (userId != null)) {
      navigate('/', { replace: true })
    }
  }, [])

  return <Outlet />
}
