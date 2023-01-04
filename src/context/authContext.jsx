import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

AuthProvider.propTypes = {
  children: PropTypes.node
}

function AuthProvider ({ children }) {
  const [auth, setAuth] = useState({})
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

function useAuth () {
  const auth = useContext(AuthContext)
  return auth
}

export { AuthProvider, useAuth }
