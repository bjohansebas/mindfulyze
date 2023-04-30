import { useState, createContext } from 'react'
import PropTypes from 'prop-types'
import localforage from 'localforage'

import { useLocalStorage } from '../hooks/useLocalStorage'
import { postLogin } from '../services/login'

const AuthContext = createContext()

AuthProvider.propTypes = {
  children: PropTypes.node
}

function AuthProvider ({ children }) {
  const [credential, setCredential] = useLocalStorage('credentials_token')
  const [userId, setUserId] = useLocalStorage('userInfo_userId')
  const [userInfo, setUserInfo] = useLocalStorage('userInfo_userInfo')
  const [hasProfile, setHasProfile] = useState(true)

  const loginAction = async (email, password, error) => {
    try {
      const response = await postLogin(email, password)

      setCredential(response.access_token)
      setUserId(response.id)
      setUserInfo(response.profile)
    } catch (err) {
      if (!err.response) {
        console.log('No server response')
      } else if (err.response?.status === 400) {
        console.log('Missing email or password')
      } else if (err.response?.status === 401) {
        console.log('Unauthorized')
      } else {
        console.log('Login failed')
      }
    }
  }

  const logoutAction = async () => {
    setCredential(null)
    setUserId(null)
    await localforage.clear()
    window.location.reload()
  }

  return <AuthContext.Provider value={{
    credential,
    setCredential,
    setUserId,
    userId,
    setUserInfo,
    userInfo,
    hasProfile,
    setHasProfile,
    loginAction,
    logoutAction
  }}>
    {children}
  </AuthContext.Provider>
}

export { AuthProvider, AuthContext }
