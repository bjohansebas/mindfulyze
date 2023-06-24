import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ResponsePlace } from './place'
import { type ResponseRelationEmotion } from './think'
import { type ResponseAccount } from './user'
import { type ErrorRequest } from './login'
import { managerErrorNetwork } from '@/errors'

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

export async function getTrash (id: string, credential: string): Promise<ResponseTrash> {
  try {
    const response: AxiosResponse<ResponseTrash, ErrorRequest> = await axios.get(`/trash/${id}`, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getAllTrashes (credential: string): Promise<ResponseTrashes> {
  try {
    const response: AxiosResponse<ResponseTrashes, ErrorRequest> = await axios.get('/users/trash', {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function restoreFromTrash (id: string, credential: string): Promise<void> {
  try {
    await axios.put(`/trash/${id}`, {}, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function deleteThinkFromTrash (id: string, credential: string): Promise<void> {
  try {
    await axios.delete(`/trash/${id}`, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
