export interface RefreshToken {
  accessToken: string
}

export interface Login {
  id: string
  email: string
  accessToken: string
  refreshToken: string
}

export interface ErrorRequest {
  statusCode: number
  message: string
  error: string
}
