import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { ErrorRequest, Login, RefreshToken } from '@/types/login'
import axios from 'api/axios'

export async function postLogin(email: string, password: string): Promise<Login> {
  try {
    const response: AxiosResponse<Login, ErrorRequest> = await axios.post('auth/login', {
      email,
      password,
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getAccessToken(refreshToken: string): Promise<RefreshToken> {
  try {
    const response: AxiosResponse<Login, ErrorRequest> = await axios.post(
      'auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    )

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
