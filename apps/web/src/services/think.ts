import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { ErrorRequest } from '@/types/login'
import { NewThink, Think, UpdateEmotionThink, UpdateThink } from '@/types/think'
import { apiPrivate as axios } from 'api/axios'

export async function getThink(id: string): Promise<Think> {
  try {
    const response: AxiosResponse<Think, ErrorRequest> = await axios.get(`/thinks/${id}`)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function postThink(data: NewThink): Promise<Think> {
  try {
    const response: AxiosResponse<Think, ErrorRequest> = await axios.post('/thinks/', data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function putThink(id: string, data: UpdateThink): Promise<Think> {
  try {
    const response: AxiosResponse<Think, ErrorRequest> = await axios.put(`/thinks/${id}/`, data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function putEmotionThink(id: string, data: UpdateEmotionThink): Promise<Think> {
  try {
    const response: AxiosResponse<Think, ErrorRequest> = await axios.put(`/thinks/${id}/emotions`, data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function deleteThink(id: string): Promise<void> {
  try {
    await axios.post(`/thinks/${id}`, {})
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
