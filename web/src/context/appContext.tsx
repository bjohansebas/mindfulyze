import { createContext, type Dispatch, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage, useSessionStorage } from 'usehooks-ts'

import { type ResponseAccount } from '@/services/user'
import { getAccessToken, postLogin } from '../services/login'

export interface AppContextProps {
	accessToken: string | null
	credential: string | null
	userId: string | null
	userInfo: ResponseAccount | null
	setCredential: Dispatch<SetStateAction<string | null>>
	setAccessToken: Dispatch<SetStateAction<string | null>>
	setUserId: Dispatch<SetStateAction<string | null>>
	setUserInfo: Dispatch<SetStateAction<ResponseAccount | null>>
	loginAction: (email: string, password: string) => Promise<void>
	logoutAction: () => void
	newAccessToken: () => Promise<void>
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

export function AppProvider({ children }: React.PropsWithChildren): JSX.Element {
	const navigate = useNavigate()

	const [accessToken, setAccessToken] = useSessionStorage<string | null>('accessToken', null)

	const [credential, setCredential] = useLocalStorage<string | null>('credential', null)
	const [userId, setUserId] = useLocalStorage<string | null>('userId', null)
	const [userInfo, setUserInfo] = useLocalStorage<ResponseAccount | null>('userInfo', null)

	const loginAction = async (email: string, password: string): Promise<void> => {
		try {
			const response = await postLogin(email, password)

			setCredential(response.refresh_token)
			setAccessToken(response.access_token)
			setUserId(response.id)
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

	const newAccessToken = async (): Promise<void> => {
		if (credential == null) return
		const getToken = await getAccessToken(credential)
		setAccessToken(getToken.access_token)
	}

	return (
		<AppContext.Provider
			value={{
				accessToken,
				credential,
				userId,
				userInfo,
				setCredential,
				setAccessToken,
				setUserId,
				setUserInfo,
				loginAction,
				logoutAction,
				newAccessToken,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}
