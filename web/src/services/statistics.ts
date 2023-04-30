import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ResponseRelationEmotion } from './think'
import { type ErrorRequest } from './login'

export async function getStatisticsAll (credential: string): Promise<ResponseRelationEmotion> {
  const response: AxiosResponse<ResponseRelationEmotion, ErrorRequest> = await axios.get('/statistics/all', {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response?.data
}

export async function getStatisticsNegative (credential: string): Promise<ResponseRelationEmotion> {
  const response: AxiosResponse<ResponseRelationEmotion, ErrorRequest> = await axios.get('/statistics/negative', {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response?.data
}

export async function getStatisticsPositive (credential: string): Promise<ResponseRelationEmotion> {
  const response: AxiosResponse<ResponseRelationEmotion, ErrorRequest> = await axios.get('/statistics/positive', {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response?.data
}
