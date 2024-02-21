export const MINDFULYZE_LOGO = 'https://res.cloudinary.com/mindfulyze/image/upload/v1693525482/logo.png'
export const MINDFULYZE_THUMBNAIL = 'https://res.cloudinary.com/mindfulyze/image/upload/v1693177063/thumbnail.png'

export const PRIVATE_APP_ROUTES = new Set(['home', 'stats', 'settings', 'welcome', 'templates'])

export const HOME_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ? 'https://mindfulyze.com'
    : process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000'
