import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Loading } from '@/app/loading'
import { useApp } from '@/hooks/useApp'
import { Account } from '@/types/user'
import { MenuLogged } from 'components/Navigation/Menu-Logged'
import { getAccount } from 'services/user'

function RequiredAuth(): JSX.Element {
  const location = useLocation()
  const navigate = useNavigate()
  const { credential, userId, setUserInfo, setCredential, setUserId } = useApp()

  const [loading, setLoading] = useState(true)

  const processLogin = async (): Promise<void> => {
    let data: Account

    if (credential == null || userId == null) {
      navigate('/login', { replace: true })
      return
    }

    try {
      const dataUser: Account = await getAccount()

      data = dataUser
    } catch (err) {
      setCredential(null)
      setUserId(null)

      localStorage.clear()

      navigate('/login', { replace: true })
      return
    }

    if (data.profile == null) {
      setLoading(false)
      navigate('/account/new', { replace: true })
      return
    }

    setUserInfo(data)

    if (location.pathname === '/account/new') {
      setLoading(false)

      navigate('/')
      return
    }
    setLoading(false)
  }

  useEffect(() => {
    void processLogin()
  }, [])

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          {!(location.pathname === '/account/new' || location.pathname === '/logout') && <MenuLogged />}
          <Outlet />
        </div>
      )}
    </>
  )
}
export { RequiredAuth }
