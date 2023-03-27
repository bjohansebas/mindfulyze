import localforage from 'localforage'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

import { MenuApp } from './MenuNav'
import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import { Loading } from '../../components/Loading'

function RequiredAuth () {
  const location = useLocation()
  const navigate = useNavigate()
  const { hasProfile, setHasProfile } = useAuth()

  const [loading, setLoading] = useState(true)

  const processLogin = async () => {
    const credential = await localforage.getItem('credentials_token')
    const userId = await localforage.getItem('userInfo_userId')
    let data = {}

    if (!credential || !userId) {
      return navigate('/login', { replace: true })
    }
    try {
      const responseUser = await axios.get('users/', {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      const dataUser = responseUser?.data

      data = {
        email: dataUser.email,
        profile: dataUser.profile
      }
    } catch (err) {
      await localforage.clear()

      return navigate('/login', { replace: true })
    }

    if (!data.profile) {
      setHasProfile(false)

      setLoading(false)
      return navigate('/account/new', { replace: true })
    }

    await localforage.setItem('userInfo_userInfo', data)
    if (location.pathname === '/account/new') {
      setLoading(false)

      return navigate('/')
    }
    setLoading(false)
  }

  useEffect(() => {
    processLogin()
  }, [])

  return (
    <>
      {loading
        ? <Loading/>
        : <>
          {hasProfile && <MenuApp />}
          <Outlet />
        </>
      }
    </>
  )
}
export { RequiredAuth }
