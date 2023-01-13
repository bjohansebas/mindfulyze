import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import axios from '../api/axios'
import PropTypes from 'prop-types'

function RequiredAuth ({ requiredProfile }) {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const { isLogin, setIsLogin, credentials, setCredentials, userId, setUserId, setUserInfo, setHasProfile } = useAuth()

  useEffect(() => {
    if (credentials && userId && !isLogin) {
      async function getUser () {
        try {
          const response = await axios.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${credentials}` }
          })
          let data = {
            username: response?.data.data.username, email: response?.data.data.email
          }
          if (requiredProfile) {
            try {
              const responseProfile = await axios.get(`/users/${userId}/profile`, {
                headers: { Authorization: `Bearer ${credentials}` }
              })
              const dataRequest = responseProfile?.data.data
              if (dataRequest?.last_name) {
                data = { lastName: dataRequest?.last_name }
              }
              data = {
                firstName: dataRequest.first_name,
                lang: dataRequest.preference_lang,
                gender: dataRequest.gender,
                ...data
              }
              setHasProfile(true)
              setUserInfo({ data })
            } catch (e) {
              navigate('/account/new')
            }
          }
          setUserInfo(data)
          setIsLogin(true)
          setLoading(false)
        } catch (e) {
          setCredentials(null)
          setUserId(null)
          setLoading(false)
          setIsLogin(false)
        }
      }
      getUser()
    } else {
      setIsLogin(false)
      setLoading(false)
      navigate('/login')
    }
  }, [])

  if (!isLogin && !loading) {
    return <Navigate to='/login' />
  }

  return <Outlet />
}

RequiredAuth.propTypes = {
  requiredProfile: PropTypes.bool
}

export { RequiredAuth }
