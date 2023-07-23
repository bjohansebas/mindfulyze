import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { apiPrivate as axios } from 'api/axios'
import { type ResponseEmotion } from './emotion'
import { type ErrorRequest } from './login'
import { type ResponsePlace } from './place'
import { type ResponseAccount } from './user'

export interface ResponseThink {
  id: string
  text: string
  createdAt: string
  updatedAt: string
  place: ResponsePlace
  user?: ResponseAccount
  emotions?: ResponseRelationEmotion
}

export interface UpdateEmotionThink {
  add: string[]
  remove: string[]
}
export type ResponseRelationEmotion = ResponseEmotion[]

export interface NewThink {
  text: string
  place: string
}

export interface UpdateThink {
  text?: string
}

export type ResponseThinks = ResponseThink[]

export async function getThink(id: string): Promise<ResponseThink> {
  try {
    const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.get(`/thinks/${id}`)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function postThink(data: NewThink): Promise<ResponseThink> {
  try {
    const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.post('/thinks/', data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function putThink(id: string, data: UpdateThink): Promise<ResponseThink> {
  try {
    const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.put(`/thinks/${id}/`, data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function putEmotionThink(id: string, data: UpdateEmotionThink): Promise<ResponseThink> {
  try {
    const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.put(`/thinks/${id}/emotions`, data)

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
