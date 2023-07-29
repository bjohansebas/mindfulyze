import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'

import { apiPrivate as axios } from '../api/axios'
import { type ResponseColor } from './color'
import { type ErrorRequest } from './login'

export interface ResponseEmotion {
  id: string
  name: string
  type: string
  color: ResponseColor
}

export type ResponseAllEmotions = ResponseEmotion[]

export async function getAllEmotions(): Promise<ResponseAllEmotions> {
  try {
    const response: AxiosResponse<ResponseAllEmotions, ErrorRequest> = await axios.get('emotions/')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
