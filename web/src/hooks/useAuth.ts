import { useContext } from 'react'

import { AppContext, type AppContextProps } from '../context/appContext'

export const useAuth = (): AppContextProps => {
  return useContext<AppContextProps>(AppContext)
}
