import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext()

AuthProvider.propTypes = {
  children: PropTypes.node
}

function AuthProvider ({ children }) {
  const [user, setUser] = useState(null)
  const auth = { user }
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

function useAuth () {
  const auth = useContext(AuthContext)
  return auth
}

export { AuthProvider, useAuth }
