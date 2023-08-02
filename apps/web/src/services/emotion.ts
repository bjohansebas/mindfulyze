import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'

import { AllEmotions } from '@/types/emotion'
import { ErrorRequest } from '@/types/login'
import { apiPrivate as axios } from '../api/axios'

export async function getAllEmotions(): Promise<AllEmotions> {
  try {
    const response: AxiosResponse<AllEmotions, ErrorRequest> = await axios.get('emotions/')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
