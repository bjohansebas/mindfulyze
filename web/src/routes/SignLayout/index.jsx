import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function SignLayoutPage () {
  const navigate = useNavigate()

  useEffect(() => {
    async function existUser () {
      const credential = localStorage.getItem('credentials_token')
      const userId = localStorage.getItem('userInfo_userId')

      if (credential && userId) {
        return navigate('/', { replace: true })
      }
    }
    existUser()
  })

  return <Outlet />
}

export { SignLayoutPage }
