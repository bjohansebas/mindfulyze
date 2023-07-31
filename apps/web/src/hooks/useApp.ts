import { useContext } from 'react'

import { AppContext, type AppContextProps } from '../context/appContext'

export const useApp = (): AppContextProps => {
  return useContext<AppContextProps>(AppContext)
}
