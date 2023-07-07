import { Box } from '@mui/material'

import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import { MenuLogged } from 'components/Navigation/Menu-Logged'
import { useAuth } from 'hooks/useAuth'
import { Loading } from 'components/Loading'
import { type ResponseAccount, getAccount } from 'services/user'

function RequiredAuth (): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const { credential, userId, setUserInfo, setCredential, setUserId } = useAuth()

  const [loading, setLoading] = useState(true)

  const processLogin = async (): Promise<void> => {
    let data: ResponseAccount

    if ((credential == null) || (userId == null)) {
      navigate('/login', { replace: true }); return
    }

    try {
      const dataUser: ResponseAccount = await getAccount()

      data = dataUser
    } catch (err) {
      setCredential(null)
      setUserId(null)

      localStorage.clear()

      navigate('/login', { replace: true }); return
    }

    if (data.profile == null) {
      setLoading(false)
      navigate('/account/new', { replace: true }); return
    }

    setUserInfo(data)

    if (location.pathname === '/account/new') {
      setLoading(false)

      navigate('/'); return
    }
    setLoading(false)
  }

  useEffect(() => {
    void processLogin()
  }, [])

  return (
    <>
      {loading
        ? <Loading />
        : <Box sx={{ display: 'flex' }}>
          {!(location.pathname === '/account/new' || location.pathname === '/logout') && <MenuLogged />}
          <Outlet />
        </Box>
      }
    </>
  )
}
export { RequiredAuth }
