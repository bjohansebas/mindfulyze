import { type AxiosResponse } from 'axios'

import { apiPrivate as axios } from '../api/axios'
import { type ErrorRequest } from './login'
import { managerErrorNetwork } from '@/errors'

export interface ResponseColor {
  id: string
  code: string
  createdAt: string
  updateAt: string
}

export async function getAllColor (): Promise<ResponseColor[]> {
  try {
    const response: AxiosResponse<ResponseColor[], ErrorRequest> = await axios.get('/users/colors')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
