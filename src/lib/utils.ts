import { init } from '@paralleldrive/cuid2'
import { type ClassValue, clsx } from 'clsx'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone.js' // dependent on utc plugin
import utc from 'dayjs/plugin/utc.js'
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

export const formatDate = (dateString: string) => {
  return new Date(`${dateString}T00:00:00Z`).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// export const getQueryString = (
//   req: Request,
//   opts?: Record<string, string>,
// ) => {
//   const { searchParams} = new URL(req.url)

//   const queryString = new URLSearchParams({
//     ...(searchParams as Record<string, string>),
//     ...opts,
//   }).toString();
//   return `${queryString ? "?" : ""}${queryString}`;
// };

dayjs.extend(utc)
dayjs.extend(timezone)

const tz = 'America/New_York'

export const parseDate = (date: Date) => {
  const dayjsLocal = dayjs(date)
  return dayjsLocal.tz(tz).toString()
}
