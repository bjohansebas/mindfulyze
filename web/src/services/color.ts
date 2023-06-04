import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'

export interface ResponseColor {
  id: string
  code: string
  createdAt: string
  updateAt: string
}

export async function getAllColor (credential: string): Promise<ResponseColor[]> {
  const response: AxiosResponse<ResponseColor[], ErrorRequest> = await axios.get('/users/colors', {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response?.data
}
