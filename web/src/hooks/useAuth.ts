import { useContext } from 'react'

import { AuthContext, type AuthContextProps } from '../context/authContext'

export const useAuth = (): AuthContextProps => {
  return useContext<AuthContextProps>(AuthContext)
}
