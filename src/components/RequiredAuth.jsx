import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import axios from '../api/axios'
import PropTypes from 'prop-types'

function RequiredAuth ({ requiredProfile }) {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const { isLogin, setIsLogin, credentials, setCredentials, userId, setUserId, setUserInfo, userInfo, setHasProfile } = useAuth()

  useEffect(() => {
    if (credentials && userId && !isLogin) {
      async function getUser () {
        try {
          const response = await axios.get(`/users/${userId}`, {
            headers: { Authorization: `Bearer ${credentials}` }
          })

          if (requiredProfile) {
            try {
              const responseProfile = await axios.get(`/users/${userId}/profile`, {
                headers: { Authorization: `Bearer ${credentials}` }
              })

              setHasProfile(true)
              setUserInfo({ ...responseProfile?.data.data })
            } catch (e) {
              navigate('/account/new')
            }
          }
          setUserInfo({ username: response?.data.data.username, email: response?.data.data.email, ...userInfo })
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
