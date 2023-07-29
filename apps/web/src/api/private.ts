import { type AxiosError, type AxiosInstance, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import dayjs from 'dayjs'
import jwt_decode, { type JwtPayload } from 'jwt-decode'

import { UnauthorizedRefreshError } from '@/errors/typeErrors'
import { getAccessToken } from '@/services/login'

export const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const credential: string = localStorage.getItem('credential')?.replaceAll('"', '') ?? ''
  const accessToken: string = sessionStorage.getItem('accessToken')?.replaceAll('"', '') ?? ''
  const setAccessToken = (value: string): void => {
    sessionStorage.setItem('accessToken', JSON.stringify(value))
  }

  config.headers = config.headers ?? {}
  if (accessToken === '') {
    const response = await newRefreshToken(credential, setAccessToken)
    config.headers.Authorization = `Bearer ${response}`
  } else {
    const isExpired = isTokenExpired(accessToken)

    if (!isExpired) {
      config.headers.Authorization = `Bearer ${accessToken}`
    } else {
      const response = await newRefreshToken(credential, setAccessToken)
      config.headers.Authorization = `Bearer ${response}`
    }
  }

  return config
}

const onRequestError = async (error: AxiosError): Promise<AxiosError> => {
  return await Promise.reject(error)
}

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response
}
const onResponseError = async (error: AxiosError): Promise<AxiosError> => {
  return await Promise.reject(error)
}

const isTokenExpired = (token: string): boolean => {
  const accessToken = jwt_decode<JwtPayload>(token)
  if (accessToken.exp == null) return false

  const isExpired = dayjs.unix(accessToken.exp).diff(dayjs()) < 1
  return isExpired
}

const newRefreshToken = async (credential: string | null, setAccessToken: (value: string) => void): Promise<string> => {
  if (credential == null) throw new UnauthorizedRefreshError('')

  const response = await getAccessToken(credential)

  setAccessToken(response.accessToken)

  return response.accessToken
}

export const setupInterceptorsTo = (axiosInstance: AxiosInstance): AxiosInstance => {
  axiosInstance.interceptors.request.use(async (config) => await onRequest(config), onRequestError)
  axiosInstance.interceptors.response.use(onResponse, onResponseError)
  return axiosInstance
}
