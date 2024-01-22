'use server'

import { encryptData } from '@/lib/encrypt'

// Create new thought for user
export async function encriptText(text: string) {
  try {
    const textEncrypt = encryptData({ key: crypto.randomUUID(), data: text })

    return textEncrypt
  } catch (e) {
    console.log(e)
    return ''
  }
}
