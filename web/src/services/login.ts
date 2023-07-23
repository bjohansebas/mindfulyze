import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import axios from 'api/axios'

export interface ResponseRefresh {
  accessToken: string
}

export interface ResponseLogin {
  id: string
  email: string
  accessToken: string
  refreshToken: string
}

export interface ErrorRequest {
  statusCode: number
  message: string
  error: string
}

export async function postLogin(email: string, password: string): Promise<ResponseLogin> {
  try {
    const response: AxiosResponse<ResponseLogin, ErrorRequest> = await axios.post('auth/login', {
      email,
      password,
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getAccessToken(refreshToken: string): Promise<ResponseRefresh> {
  try {
    const response: AxiosResponse<ResponseLogin, ErrorRequest> = await axios.post(
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
