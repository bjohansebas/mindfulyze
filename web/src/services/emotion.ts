import { type AxiosResponse } from 'axios'

import { apiPrivate as axios } from '../api/axios'
import { type ErrorRequest } from './login'
import { type ResponseColor } from './color'
import { managerErrorNetwork } from '@/errors'

export interface ResponseEmotion {
  id: string
  name: string
  type: string
  color: ResponseColor
}

export type ResponseAllEmotions = ResponseEmotion[]

export async function getAllEmotions (): Promise<ResponseAllEmotions> {
  try {
    const response: AxiosResponse<ResponseAllEmotions, ErrorRequest> = await axios.get('emotions/')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
