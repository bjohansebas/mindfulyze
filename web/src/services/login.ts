import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { managerErrorNetwork } from '@/errors'

export interface ResponseLogin {
  id: string
  email: string
  access_token: string
}

export interface ErrorRequest {
  statusCode: number
  message: string
  error: string
}

export async function postLogin (email: string, password: string): Promise<ResponseLogin> {
  try {
    const response: AxiosResponse<ResponseLogin, ErrorRequest> = await axios.post('auth/login',
      {
        email, password
      })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
