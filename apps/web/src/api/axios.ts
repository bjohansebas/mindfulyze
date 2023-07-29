import axios, { type AxiosInstance } from 'axios'

import { setupInterceptorsTo } from './private'

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

export const apiPrivate: AxiosInstance = setupInterceptorsTo(
  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { 'Content-Type': 'application/json' },
  }),
)

export default api
