import { createContext } from 'react'
import PropTypes from 'prop-types'
import { useLocalStorage } from '../hooks/useLocalStorage'
// import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

function AuthProvider ({ children }) {
  // const navigate = useNavigate()
  const { item: credentials, saveItem: setCredentials } = useLocalStorage('credentials_token')
  const { item: userId, saveItem: setUserId } = useLocalStorage('userInfo_userId')
  const { item: userInfo, saveItem: setUserInfo } = useLocalStorage('userInfo_userInfo')

  // const [isLogin, setIsLogin] = useState(false)
  // const [hasProfile, setHasProfile] = useState(false)

  // const logoutEvent = () => {
  //   setIsLogin(false)
  //   setCredentials(null)
  //   setUserId(null)
  //   setUserInfo({})
  //   setHasProfile(false)
  //   navigate('/login', { replace: true })
  // }

  // const loginPost = async (email, password) => {
  //   try {
  //     const response = await axios.post('/auth/login',
  //       JSON.stringify({
  //         email,
  //         password
  //       })
  //     )

  //     const accessToken = response?.data.data.login_session
  //     const id = response?.data.data.id

  //     setCredentials(accessToken)
  //     setUserId(id)
  //     setUserInfo({ email })

  //     navigate('/dashboard', { replace: true })
  //   } catch (err) {
  //     if (!err?.response) {
  //       return 'No server response'
  //     } else if (err.response?.status === 400) {
  //       return 'Missing Username or Password'
  //     } else if (err.response?.status === 401) {
  //       return 'Unauthorized'
  //     } else {
  //       return 'Login failed'
  //     }
  //   }
  // }

  return <AuthContext.Provider value={{
    credentials,
    setCredentials,
    setUserId,
    userId,
    setUserInfo,
    // hasProfile,
    // setHasProfile,
    userInfo
    // loginPost,
    // isLogin,
    // setIsLogin,
    // logoutEvent
  }}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node
}

export { AuthProvider, AuthContext }
