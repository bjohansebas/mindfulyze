import { useContext } from 'react'

import { AuthContext, AuthContextProps } from '../context/authContext'

export const useAuth = () => {
  return useContext<AuthContextProps>(AuthContext)
}
