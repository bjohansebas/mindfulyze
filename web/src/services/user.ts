import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'
import { DATE_REGEX, GENDER_REGEX, NAMES_REGEX } from '../utils/regex'

export interface ResponseAccount {
  id: string
  email: string
  changedPasswordAt: string
  createdAt: string
  updatedAt: string
  profile?: ResponseProfile | null
}

export interface ResponseProfile {
  firstName: string
  lastName: string | null
  birth: string | null
  preferenceLang: string
  gender: string
  user: ResponseAccount
  photo: string | null
  id: string
  createdAt: string
  updatedAt: string
}

export interface UpdateAccount {
  email: string
}

export interface UpdateProfile {
  firstName?: string
  lastName?: string
  birth?: string
  gender?: string
  preferenceLang?: string
}

export async function getAccount (credential: string): Promise<ResponseAccount> {
  const response: AxiosResponse<ResponseAccount, ErrorRequest> = await axios.get('users/', {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response?.data
}

export async function putAccount (data: UpdateAccount, credential: string): Promise<ResponseAccount> {
  const response: AxiosResponse<ResponseAccount, ErrorRequest> = await axios.put('/users/account', data, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response.data
}

export async function putProfile (data: UpdateProfile, credential: string): Promise<ResponseProfile> {
  if (((data.firstName != null) && !NAMES_REGEX.test(data.firstName)) || ((data.lastName != null) && !NAMES_REGEX.test(data.lastName))) {
    throw new Error('Please enter a valid name')
  }

  if ((data.gender != null) && GENDER_REGEX.test(data.gender)) {
    throw new Error('Please enter a valid gender')
  }

  if ((data?.birth != null) && !DATE_REGEX.test(data?.birth)) {
    throw new Error('Please enter a valid date')
  }

  const response: AxiosResponse<ResponseProfile, ErrorRequest> = await axios.put('/users/profile', data, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response.data
}

export async function deleteAccountUser (credential: string): Promise<void> {
  await axios.delete('/users/', {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })
}
