import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { apiPrivate as axios } from '../api/axios'
import { type ResponseColor } from './color'
import { type ErrorRequest } from './login'
import { type ResponseThinks } from './think'
import { type ResponseAccount } from './user'

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

export async function getPlace(id: string): Promise<ResponsePlace> {
  try {
    const response: AxiosResponse<ResponsePlace, ErrorRequest> = await axios.get(`/places/${id}`)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getThinksPlace(id: string): Promise<ResponseThinks> {
  try {
    const response: AxiosResponse<ResponseThinks, ErrorRequest> = await axios.get(`/places/${id}/thinks`)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function getAllPlaces(): Promise<ResponseAllPlaces> {
  try {
    const response: AxiosResponse<ResponseAllPlaces, ErrorRequest> = await axios.get('/users/places')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function postPlace(data: NewPlace): Promise<ResponsePlace> {
  try {
    const response: AxiosResponse<ResponsePlace, ErrorRequest> = await axios.post('/places', data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function putPlace(id: string, data: UpdatePlace): Promise<ResponsePlace> {
  try {
    const response: AxiosResponse<ResponsePlace, ErrorRequest> = await axios.put(`/places/${id}/`, data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function deletePlace(id: string): Promise<void> {
  try {
    await axios.delete(`/places/${id}`)
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
