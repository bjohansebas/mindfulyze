import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { BadRequestError } from '@/errors/typeErrors'
import { apiPrivate as axios } from '../api/axios'
import { DATE_REGEX, GENDER_REGEX, NAMES_REGEX } from '../utils/regex'
import { type ErrorRequest } from './login'

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
	lastName?: string | null
	birth?: string | null
	gender?: string
	preferenceLang?: string
}

export async function getAccount(): Promise<ResponseAccount> {
	try {
		const response: AxiosResponse<ResponseAccount, ErrorRequest> = await axios.get('users/')

		return response.data
	} catch (err) {
		throw managerErrorNetwork(err)
	}
}

export async function putAccount(data: UpdateAccount): Promise<ResponseAccount> {
	try {
		const response: AxiosResponse<ResponseAccount, ErrorRequest> = await axios.put('/users/account', data)

		return response.data
	} catch (err) {
		throw managerErrorNetwork(err)
	}
}

export async function putProfile(data: UpdateProfile): Promise<ResponseProfile> {
	try {
		if (
			(data.firstName != null && !NAMES_REGEX.test(data.firstName)) ||
			(data.lastName != null && !NAMES_REGEX.test(data.lastName))
		) {
			throw new BadRequestError('Please enter a valid name')
		}

		if (data.gender != null && GENDER_REGEX.test(data.gender)) {
			throw new BadRequestError('Please enter a valid gender')
		}

		if (data?.birth != null && !DATE_REGEX.test(data?.birth)) {
			throw new BadRequestError('Please enter a valid date')
		}

		const response: AxiosResponse<ResponseProfile, ErrorRequest> = await axios.put('/users/profile', data)

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
