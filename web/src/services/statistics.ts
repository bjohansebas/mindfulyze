import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ResponseRelationEmotion } from './think'
import { type ErrorRequest } from './login'
import { managerErrorNetwork } from '@/errors'

export async function getStatisticsAll (credential: string): Promise<ResponseRelationEmotion[]> {
  try {
    const response: AxiosResponse<ResponseRelationEmotion[], ErrorRequest> = await axios.get('/statistics/all', {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getStatisticsNegative (credential: string): Promise<ResponseRelationEmotion[]> {
  try {
    const response: AxiosResponse<ResponseRelationEmotion[], ErrorRequest> = await axios.get('/statistics/negative', {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getStatisticsPositive (credential: string): Promise<ResponseRelationEmotion[]> {
  try {
    const response: AxiosResponse<ResponseRelationEmotion[], ErrorRequest> = await axios.get('/statistics/positive', {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
