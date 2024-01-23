export const PRIVATE_APP_ROUTES = new Set(['home', 'stats', 'settings', 'welcome', 'templates'])

export const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://mindfulyze.com'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000'

export const ENCRYPTION_METHOD = 'aes-256-cbc'

export const SECRET_IV = process.env.SECRET_IV as string

export const NEXT_SECRET = process.env.NEXTAUTH_SECRET as string

export const NEXT_URL = process.env.NEXTAUTH_URL as string

export const DEFAULT_COST_SALT = 12

export const MIN_LENGTH_PW = 8
export const MAX_LENGTH_PW = 70

export const MINDFULYZE_LOGO = 'https://res.cloudinary.com/mindfulyze/image/upload/v1693525482/logo.png'
export const MINDFULYZE_THUMBNAIL = 'https://res.cloudinary.com/mindfulyze/image/upload/v1693177063/thumbnail.png'
