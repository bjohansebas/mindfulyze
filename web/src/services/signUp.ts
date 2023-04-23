import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'

export interface ResponseSignUpAccount {
  email: string
  id: string
  changedPasswordAt: string
  createdAt: string
  updatedAt: string
}

export async function postSignUpAccount (password: string, email: string): Promise<ResponseSignUpAccount> {
  const response: AxiosResponse<ResponseSignUpAccount, ErrorRequest> =
    await axios.post('/auth/signup', { email, password })

  return response.data
}
