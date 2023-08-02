import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { BadRequestError } from '@/errors/typeErrors'
import { ErrorRequest } from '@/types/login'
import { Account, Profile, UpdateAccount, UpdateProfile } from '@/types/user'
import { apiPrivate as axios } from '../api/axios'
import { NAMES_REGEX } from '../utils/regex'

export async function getAccount(): Promise<Account> {
  try {
    const response: AxiosResponse<Account, ErrorRequest> = await axios.get('users/')

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function putAccount(data: UpdateAccount): Promise<Account> {
  try {
    const response: AxiosResponse<Account, ErrorRequest> = await axios.put('/users/account', data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function putProfile(data: UpdateProfile): Promise<Profile> {
  try {
    if (data.name != null && !NAMES_REGEX.test(data.name)) {
      throw new BadRequestError('Please enter a valid name')
    }

    const response: AxiosResponse<Profile, ErrorRequest> = await axios.put('/users/profile', data)

    return response.data
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}

export async function deleteAccountUser(): Promise<void> {
  try {
    await axios.delete('/users/')
  } catch (err) {
    throw managerErrorNetwork(err)
  }
}
