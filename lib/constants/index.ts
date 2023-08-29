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
