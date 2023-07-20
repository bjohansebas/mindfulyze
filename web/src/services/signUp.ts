import { type AxiosResponse } from 'axios'

import { managerErrorNetwork } from '@/errors'
import { BadRequestError } from '@/errors/typeErrors'
import axios, { apiPrivate } from '../api/axios'
import { DATE_REGEX, GENDER_REGEX, NAMES_REGEX } from '../utils/regex'
import { type ErrorRequest } from './login'
import { type ResponseProfile } from './user'

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

export async function postSignUpAccount(password: string, email: string): Promise<ResponseSignUpAccount> {
	try {
		const response: AxiosResponse<ResponseSignUpAccount, ErrorRequest> = await axios.post('/auth/signup', {
			email,
			password,
		})

		return response.data
	} catch (err) {
		throw managerErrorNetwork(err)
	}
}

export async function postNewProfile(data: dataProfile): Promise<ResponseProfile> {
	try {
		const testNames: boolean = NAMES_REGEX.test(data.firstName)
		const testGender: boolean = GENDER_REGEX.test(data.gender)

		if (!testNames || (data.lastName != null && !NAMES_REGEX.test(data.lastName))) {
			throw new BadRequestError('Please enter a valid name')
		}

		if (!testGender) {
			throw new BadRequestError('Please enter a valid gender')
		}

		if (data?.birth != null && !DATE_REGEX.test(data?.birth)) {
			throw new BadRequestError('Please enter a valid date')
		}

		const response: AxiosResponse<ResponseProfile, ErrorRequest> = await apiPrivate.post('/users/profile', { ...data })

		return response.data
	} catch (err) {
		throw managerErrorNetwork(err)
	}
}
