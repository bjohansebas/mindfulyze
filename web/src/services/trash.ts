import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { apiPrivate as axios } from '../api/axios'
import { type ErrorRequest } from './login'
import { type ResponsePlace } from './place'
import { type ResponseRelationEmotion } from './think'
import { type ResponseAccount } from './user'

export interface ResponseTrash {
  id: string
  text: string
  createdAt: string
  updatedAt: string
  place: ResponsePlace
  user?: ResponseAccount
  emotions?: ResponseRelationEmotion[]
  dateStart: string
  dateEnd: string
}

export type ResponseTrashes = ResponseTrash[]

export async function getTrash(id: string): Promise<ResponseTrash> {
  try {
    const response: AxiosResponse<ResponseTrash, ErrorRequest> = await axios.get(`/trash/${id}`)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getAllTrashes(): Promise<ResponseTrashes> {
  try {
    const response: AxiosResponse<ResponseTrashes, ErrorRequest> = await axios.get('/users/trash')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function restoreFromTrash(id: string): Promise<void> {
  try {
    await axios.put(`/trash/${id}`, {})
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function deleteThinkFromTrash(id: string): Promise<void> {
  try {
    await axios.delete(`/trash/${id}`)
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
