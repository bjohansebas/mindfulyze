import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { BadRequestError } from '@/errors/typeErrors'

import axios, { apiPrivate } from '../api/axios'

import { NAMES_REGEX } from '../utils/regex'

import { ErrorRequest } from '@/types/login'
import { Account, NewProfile, Profile } from '@/types/user'

export async function postSignUpAccount(password: string, email: string): Promise<Account> {
  try {
    const response: AxiosResponse<Account, ErrorRequest> = await axios.post('/auth/signup', {
      email,
      password,
    })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function postNewProfile(data: NewProfile): Promise<Profile> {
  try {
    const testName: boolean = NAMES_REGEX.test(data.name)

    if (!testName) {
      throw new BadRequestError('Please enter a valid name')
    }

    const response: AxiosResponse<Profile, ErrorRequest> = await apiPrivate.post('/users/profile', { ...data })

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
