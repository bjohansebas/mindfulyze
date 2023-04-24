import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'
import { type ResponsePlace } from './place'
import { type ResponseAccount } from './user'
import { type ResponseEmotion } from './emotion'

export interface ResponseThink {
  id: string
  text: string
  isArchive: boolean
  createdAt: string
  updatedAt: string
  place?: ResponsePlace
  user?: ResponseAccount
  emotions?: ResponseRelationEmotion
}

export interface ResponseRelationEmotion {
  id: string
  emotion: ResponseEmotion
}

export interface NewThink {
  text: string
  place: string
}

export interface UpdateThink {
  text: string
  isArchive: boolean
}

export async function getThink (id: string, credential: string): Promise<ResponseThink> {
  const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.get(`/thinks/${id}`, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response.data
}

export async function postThink (data: NewThink, credential: string): Promise<ResponseThink> {
  const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.post('/thinks/', data, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response.data
}

export async function putThink (id: string, data: UpdateThink, credential: string): Promise<ResponseThink> {
  const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.put(`/thinks/${id}/`, data,
    {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

  return response.data
}

export async function putAddEmotion (id: string, data: string[], credential: string): Promise<ResponseThink> {
  const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.put(`/thinks/${id}/emotions/add`,
    {
      emotions: data
    },
    {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

  return response.data
}

export async function putDeleteEmotion (id: string, data: string[], credential: string): Promise<ResponseThink> {
  const response: AxiosResponse<ResponseThink, ErrorRequest> = await axios.put(`/thinks/${id}/emotions/remove`,
    {
      emotions: data
    },
    {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

  return response.data
}

export async function moveToTrash (id: string, credential: string): Promise<void> {
  await axios.put(`/thinks/${id}/trash`, {}, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })
}
