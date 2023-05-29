import { createContext, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

import { postLogin } from '../services/login'

export interface AppContextProps {
  credential: string | null
  userId: string | null
  userInfo: object | null
  setCredential: Dispatch<SetStateAction<string | null>>
  setUserId: Dispatch<SetStateAction<string | null>>
  setUserInfo: Dispatch<SetStateAction<object | null>>
  loginAction: (email: string, password: string) => Promise<void>
  logoutAction: () => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export function AppProvider ({ children }: React.PropsWithChildren): JSX.Element {
  const navigate = useNavigate()

  const [credential, setCredential] = useLocalStorage<string | null>('credentials_token', null)
  const [userId, setUserId] = useLocalStorage<string | null>('userId', null)
  const [userInfo, setUserInfo] = useLocalStorage<object | null>('userInfo', null)

  const loginAction = async (email: string, password: string): Promise<void> => {
    try {
      const response = await postLogin(email, password)

      setCredential(response.access_token)
      setUserId(response.id)
      setUserInfo({ ...response })
    } catch (err) {
      console.log('Login failed')
    }
  }

  const logoutAction = async (): Promise<void> => {
    setCredential(null)
    setUserId(null)
    setUserInfo(null)
    localStorage.clear()
    navigate('/login')
  }

  return <AppContext.Provider value={{
    credential,
    setCredential,
    setUserId,
    userId,
    setUserInfo,
    userInfo,
    loginAction,
    logoutAction
  }}>
    {children}
  </AppContext.Provider>
}
