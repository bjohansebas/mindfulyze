import { type AxiosResponse } from 'axios'

import { apiPrivate as axios } from '../api/axios'
import { type ResponseRelationEmotion } from './think'
import { type ErrorRequest } from './login'
import { managerErrorNetwork } from '@/errors'

export async function getStatisticsAll (): Promise<ResponseRelationEmotion[]> {
  try {
    const response: AxiosResponse<ResponseRelationEmotion[], ErrorRequest> = await axios.get('/statistics/all')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getStatisticsNegative (): Promise<ResponseRelationEmotion[]> {
  try {
    const response: AxiosResponse<ResponseRelationEmotion[], ErrorRequest> = await axios.get('/statistics/negative')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getStatisticsPositive (): Promise<ResponseRelationEmotion[]> {
  try {
    const response: AxiosResponse<ResponseRelationEmotion[], ErrorRequest> = await axios.get('/statistics/positive')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
