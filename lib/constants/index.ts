export const PRIVATE_APP_ROUTES = new Set(['home', 'stats', 'settings', 'welcome'])

export const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` // 'https://mindfulyze.com'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:8888'

export const ENCRYPTION_METHOD = 'aes-256-cbc'

// rome-ignore lint/style/noNonNullAssertion: <explanation>
export const SECRET_IV = process.env.SECRET_IV!

// rome-ignore lint/style/noNonNullAssertion: <explanation>
export const NEXT_SECRET = process.env.NEXTAUTH_SECRET!

export const DEFAULT_COST_SALT = 12

export const MIN_LENGTH_PW = 8
export const MAX_LENGTH_PW = 70

export const MINDFULYZE_LOGO = 'https://res.cloudinary.com/mindfulyze/image/upload/v1693525482/logo.png'
export const MINDFULYZE_THUMBNAIL = 'https://res.cloudinary.com/mindfulyze/image/upload/v1693177063/thumbnail.png'
