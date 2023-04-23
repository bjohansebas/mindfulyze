import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'
import { DATE_REGEX, GENDER_REGEX, NAMES_REGEX } from '../utils/regex'

export interface ResponseSignUpAccount {
  email: string
  id: string
  changedPasswordAt: string
  createdAt: string
  updatedAt: string
}

interface ResponseAccount {
  id: string
  email: string
  changedPasswordAt: string
  createdAt: string
  updatedAt: string
  profile: string | null
}

interface ResponseProfile {
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

interface dataProfile {
  firstName: string
  lastName?: string
  birth?: string
  gender: string
  preferenceLang: string
}

export async function postSignUpAccount (password: string, email: string): Promise<ResponseSignUpAccount> {
  const response: AxiosResponse<ResponseSignUpAccount, ErrorRequest> =
    await axios.post('/auth/signup', { email, password })

  return response.data
}

export async function postNewProfile (data: dataProfile, credential: string): Promise<ResponseProfile> {
  const testNames: boolean = NAMES_REGEX.test(data.firstName)
  const testGender: boolean = GENDER_REGEX.test(data.gender)

  if (!testNames || ((data.lastName != null) && !NAMES_REGEX.test(data.lastName))) {
    throw new Error('Please enter a valid name')
  }

  if (!testGender) {
    throw new Error('Please enter a valid gender')
  }

  if (((data?.birth) != null) && !DATE_REGEX.test(data?.birth)) {
    throw new Error('Please enter a valid date')
  }

  const response: AxiosResponse<ResponseProfile, ErrorRequest> = await axios.post('/users/profile', { ...data }, {
    headers: {
      Authorization: `Bearer ${credential}`
    }
  })

  return response?.data
}
