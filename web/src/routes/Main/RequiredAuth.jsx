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
      const responseUser = await axios.get(`users/${userId}`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      const dataUser = responseUser?.data.data

      data = {
        username: dataUser.username,
        email: dataUser.email
      }
    } catch (err) {
      await localforage.clear()

      return navigate('/login', { replace: true })
    }

    try {
      const responseProfile = await axios.get(`users/${userId}/profile`,
        {
          headers: {
            Authorization: `Bearer ${credential}`
          }
        }
      )

      const dataProfile = responseProfile?.data.data

      data = {
        firstName: dataProfile.first_name,
        lastName: dataProfile.last_name,
        lang: dataProfile.preference_lang,
        gender: dataProfile.gender,
        ...data
      }

      if (location.pathname === '/account/new') {
        return navigate('/')
      }
    } catch (err) {
      setHasProfile(false)

      return navigate('/account/new', { replace: true })
    } finally {
      setLoading(false)

      await localforage.setItem('userInfo_userInfo', data)
    }
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
