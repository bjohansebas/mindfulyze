import { HOME_DOMAIN } from '@/lib/constants'

export async function getThoughts() {
  const response = await fetch(`${HOME_DOMAIN}/api/thoughts`)

  return response.json()
}
