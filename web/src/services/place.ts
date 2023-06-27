import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'
import { type ResponseAccount } from './user'
import { type ResponseColor } from './color'
import { type ResponseThinks } from './think'
import { type ResponseTrashes } from './trash'
import { managerErrorNetwork } from '@/errors'

export interface ResponsePlace {
  id: string
  name: string
  createdAt: string
  updateAt: string
  user?: ResponseAccount
  color: ResponseColor

}

export type ResponseAllPlaces = ResponsePlace[]

export interface NewPlace {
  name: string
  code: string
}

export interface UpdatePlace {
  name?: string
  code?: string
}

export async function getPlace (id: string, credential: string): Promise<ResponsePlace> {
  try {
    const response: AxiosResponse<ResponsePlace, ErrorRequest> = await axios.get(`/places/${id}`, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getThinksPlace (id: string, credential: string): Promise<ResponseThinks> {
  try {
    const response: AxiosResponse<ResponseThinks, ErrorRequest> = await axios.get(`/places/${id}/thinks`, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getTrashPlace (id: string, credential: string): Promise<ResponseTrashes> {
  try {
    const response: AxiosResponse<ResponseTrashes, ErrorRequest> = await axios.get(`/places/${id}/trash`, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getArchiveThinksPlace (id: string, credential: string): Promise<ResponseThinks> {
  try {
    const response: AxiosResponse<ResponseThinks, ErrorRequest> = await axios.get(`/places/${id}/thinks/archive`, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getAllPlaces (credential: string): Promise<ResponseAllPlaces> {
  try {
    const response: AxiosResponse<ResponseAllPlaces, ErrorRequest> = await axios.get('/users/places', {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function postPlace (data: NewPlace, credential: string): Promise<ResponsePlace> {
  try {
    const response: AxiosResponse<ResponsePlace, ErrorRequest> = await axios.post('/places', data, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function putPlace (id: string, data: UpdatePlace, credential: string): Promise<ResponsePlace> {
  try {
    const response: AxiosResponse<ResponsePlace, ErrorRequest> = await axios.put(`/places/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function deletePlace (id: string, credential: string): Promise<void> {
  try {
    await axios.delete(`/places/${id}`, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
