import { type AxiosResponse } from 'axios'

import axios from '../api/axios'

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
  const response: AxiosResponse<ResponseLogin, ErrorRequest> = await axios.post('auth/login',
    {
      email, password
    })

  return response.data
}
