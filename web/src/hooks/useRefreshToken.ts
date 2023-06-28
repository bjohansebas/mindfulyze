import { useAuth } from './useAuth'

import { getAccessToken } from '@/services/login'
import { UnauthorizedRefreshError } from '@/errors/typeErrors'

export const useRefreshToken = async (): Promise<() => Promise<string>> => {
  const { setAccessToken, credential } = useAuth()

  const refresh = async (): Promise<string> => {
    if (credential == null) throw new UnauthorizedRefreshError('')

    const response = await getAccessToken(credential)

    setAccessToken(response.access_token)
    return response.access_token
  }

  return refresh
}
