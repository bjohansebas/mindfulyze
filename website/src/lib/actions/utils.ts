'use server'

import { redirect as redirectNext } from 'next/navigation'

export const redirect = (path: string) => {
  redirectNext(path)
}
