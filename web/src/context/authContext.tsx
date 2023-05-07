import { useState, createContext, Dispatch, SetStateAction } from 'react'

import { useLocalStorage } from 'usehooks-ts'
import { postLogin } from '../services/login'

export type AuthContextProps = {
  credential: string | null
  userId: string | null,
  userInfo: object | null,
  setCredential: Dispatch<SetStateAction<string | null>>
  setUserId: Dispatch<SetStateAction<string | null>>,
  setUserInfo: Dispatch<SetStateAction<object | null>>,
  hasProfile: boolean,
  setHasProfile: Dispatch<SetStateAction<boolean>>,
  loginAction: (email: string, password: string) => Promise<void>,
  logoutAction: () => void
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [credential, setCredential] = useLocalStorage<string | null>('credentials_token', null)
  const [userId, setUserId] = useLocalStorage<string | null>('userInfo_userId', null)
  const [userInfo, setUserInfo] = useLocalStorage<object | null>('userInfo_userInfo', null)
  const [hasProfile, setHasProfile] = useState(true)

  const loginAction = async (email: string, password: string) => {
    try {
      const response = await postLogin(email, password)

      setCredential(response.access_token)
      setUserId(response.id)
      setUserInfo({ email: response.email })
    } catch (err) {
      console.log('Login failed')
    }
  }

  const logoutAction = async () => {
    setCredential(null)
    setUserId(null)
    localStorage.clear()
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
