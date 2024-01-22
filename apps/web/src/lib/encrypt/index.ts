import crypto from 'crypto'

import { EncryptDataProps } from '@/@types/encrypt'
import { ENCRYPTION_METHOD, SECRET_IV } from '@/lib/constants'

/**
 * Generate a secret hash to use for encryption.
 *
 * @param password - The password used to generate the secret hash.
 * @returns The generated secret hash as a string.
 *
 * @example
 * const password = 'myPassword123'
 * const key = generateKey(password)
 * console.log(key) // Output: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6'
 */
export const generateKey = (password: string) => {
  return crypto.createHash('sha512').update(password).digest('hex').substring(0, 32)
}

const encryptionIV = crypto.createHash('sha512').update(SECRET_IV).digest('hex').substring(0, 16)

// Encrypt data
export function encryptData({ key, data }: EncryptDataProps) {
  const encryptKey = generateKey(key)
  const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, encryptKey, encryptionIV)

  // Encrypts data and converts to hex and base64
  return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64')
}

// Decrypt data
export function decryptData({ key, data }: EncryptDataProps) {
  const encryptKey = generateKey(key)

  const buff = Buffer.from(data, 'base64')
  const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, encryptKey, encryptionIV)

  // Decrypts data and converts to utf8
  return decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8')
}
