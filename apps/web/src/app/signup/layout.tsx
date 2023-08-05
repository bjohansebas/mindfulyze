import { useApp } from '@/hooks/useApp'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Outlet, useNavigate } from 'react-router-dom'

export const SignLayoutPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { credential, userId } = useApp()

  useEffect(() => {
    if (credential != null && userId != null) {
      navigate('/', { replace: true })
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Sign up | Mindfulyze</title>
      </Helmet>
      <Outlet />
    </>
  )
}

export default SignLayoutPage
