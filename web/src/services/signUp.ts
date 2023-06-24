import { type AxiosResponse } from 'axios'

import axios from '../api/axios'
import { type ErrorRequest } from './login'
import { DATE_REGEX, GENDER_REGEX, NAMES_REGEX } from '../utils/regex'
import { type ResponseProfile } from './user'
import { managerErrorNetwork } from '@/errors'
import { BadRequestError } from '@/errors/typeErrors'

export interface ResponseSignUpAccount {
  email: string
  id: string
  changedPasswordAt: string
  createdAt: string
  updatedAt: string
}

export interface dataProfile {
  firstName: string
  lastName?: string
  birth?: string
  gender: string
  preferenceLang: string
}

export async function postSignUpAccount (password: string, email: string): Promise<ResponseSignUpAccount> {
  try {
    const response: AxiosResponse<ResponseSignUpAccount, ErrorRequest> =
    await axios.post('/auth/signup', { email, password })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function postNewProfile (data: dataProfile, credential: string): Promise<ResponseProfile> {
  try {
    const testNames: boolean = NAMES_REGEX.test(data.firstName)
    const testGender: boolean = GENDER_REGEX.test(data.gender)

    if (!testNames || ((data.lastName != null) && !NAMES_REGEX.test(data.lastName))) {
      throw new BadRequestError('Please enter a valid name')
    }

    if (!testGender) {
      throw new BadRequestError('Please enter a valid gender')
    }

    if (((data?.birth) != null) && !DATE_REGEX.test(data?.birth)) {
      throw new BadRequestError('Please enter a valid date')
    }

    const response: AxiosResponse<ResponseProfile, ErrorRequest> = await axios.post('/users/profile', { ...data }, {
      headers: {
        Authorization: `Bearer ${credential}`
      }
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
