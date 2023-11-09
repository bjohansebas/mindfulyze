import { init } from '@paralleldrive/cuid2'
import { SubscriptionPlanSlug } from '@prisma/client'
import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'
import { Session } from 'next-auth'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch (e) {
    return null
  }
}

/**
 * Takes a name as input and returns the initials of the name as a string.
 * If the name is empty or only contains whitespace, it returns 'SB'.
 * The function splits the name into an array of words and then concatenates
 * the first letter of each word to form the initials.
 *
 * @param name - The name from which to generate the initials.
 * @returns The initials of the input name.
 */
export function stringAvatar(name: string): string {
  const nameDivided = name.split(' ')
  let result = ''

  if (!nameDivided[0]?.[0]) {
    return 'SB'
  }

  result += nameDivided[0][0]

  if (nameDivided[1]?.length) {
    result += nameDivided[1][0]
  }

  return result
}

// The init function returns a custom createId function with the specified
// configuration. All configuration properties are optional.
export const createId = init({
  // the length of the id
  length: 26,
})

export const formatDate = (date: string | null | undefined) => {
  if (!date) return ''
  try {
    return new Date(`${date}`).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    })
  } catch (e) {
    console.error(e)
  }
}

dayjs.extend(utc)
dayjs.extend(timezone)

const tz = 'America/New_York'

export const parseDate = (date: Date) => {
  const dayjsLocal = dayjs(date)
  return dayjsLocal.tz(tz).toString()
}

/**
 * Parses the subscription plans and returns the URL for redirecting the user based on the conditions.
 *
 * @param session - The user session object or null.
 * @param slug - The subscription plan slug.
 * @param lemonSqueezyUrl - The URL for redirecting to the payment page.
 * @returns A string representing the URL to redirect the user based on the conditions.
 */
export const parsePlans = (session: Session | null, slug: SubscriptionPlanSlug, lemonSqueezyUrl: string) => {
  if (session == null && slug === SubscriptionPlanSlug.free) {
    return '/home'
  } else if (
    (session == null && slug === SubscriptionPlanSlug.plus) ||
    ((session?.user.subscriptionPlan === SubscriptionPlanSlug.free || session?.user.subscriptionPlan == null) &&
      slug === SubscriptionPlanSlug.plus)
  ) {
    return `/redirect/payment?url=${lemonSqueezyUrl}`
  } else if (session?.user.subscriptionPlan === SubscriptionPlanSlug.free && slug === SubscriptionPlanSlug.free) {
    return '/home'
  } else {
    return '/home'
  }
}
