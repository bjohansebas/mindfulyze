import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { ErrorRequest } from '@/types/login'
import { AllPlaces } from '@/types/place'
import { apiPrivate as axios } from '../api/axios'

export async function getAllPlaces(): Promise<AllPlaces> {
  try {
    const response: AxiosResponse<AllPlaces, ErrorRequest> = await axios.get('/places')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
