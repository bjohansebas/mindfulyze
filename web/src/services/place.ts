import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'
import { type ResponseAccount } from './user'
import { type ResponseColor } from './color'

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
  color: string
}

export interface UpdatePlace {
  name?: string
  color?: string
}

export async function getPlace (id: string, credential: string): Promise<ResponseAllPlaces> {
  const response: AxiosResponse<ResponseAllPlaces, ErrorRequest> = await axios.get(`/places/${id}`, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response?.data
}

export async function getAllPlaces (credential: string): Promise<ResponseAllPlaces> {
  const response: AxiosResponse<ResponseAllPlaces, ErrorRequest> = await axios.get('/users/places', {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response?.data
}

export async function postPlace (data: NewPlace, credential: string): Promise<ResponsePlace> {
  const response: AxiosResponse<ResponsePlace, ErrorRequest> = await axios.post('/places', data, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response.data
}

export async function putPlace (id: string, data: UpdatePlace, credential: string): Promise<ResponsePlace> {
  const response: AxiosResponse<ResponsePlace, ErrorRequest> = await axios.put(`/places/${id}/`, data, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response.data
}

export async function deletePlace (id: string, credential: string): Promise<void> {
  await axios.delete(`/places/${id}`, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })
}
