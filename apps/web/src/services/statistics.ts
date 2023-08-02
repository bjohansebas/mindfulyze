import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { AllEmotions } from '@/types/emotion'
import { ErrorRequest } from '@/types/login'
import { apiPrivate as axios } from '../api/axios'

export async function getStatisticsAll(): Promise<AllEmotions> {
  try {
    const response: AxiosResponse<AllEmotions, ErrorRequest> = await axios.get('/statistics/all')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getStatisticsNegative(): Promise<AllEmotions> {
  try {
    const response: AxiosResponse<AllEmotions, ErrorRequest> = await axios.get('/statistics/negative')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getStatisticsPositive(): Promise<AllEmotions> {
  try {
    const response: AxiosResponse<AllEmotions, ErrorRequest> = await axios.get('/statistics/positive')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
