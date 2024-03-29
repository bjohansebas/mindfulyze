import crypto from 'node:crypto'

import { ENCRYPTION_METHOD, SECRET_IV } from '@mindfulyze/utils/src/constants'

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

/**
 * Encrypts the given data using the provided key.
 *
 * @param {EncryptDataProps} params - The parameters for encrypting the data.
 * @param {string} params.key - The key used for encryption.
 * @param {string} params.data - The data to be encrypted.
 * @returns {string} - The encrypted data in base64 format.
 */
export function encryptData({
  key,
  data,
}: {
  key: string
  data: string
}): string {
  const encryptKey = generateKey(key)
  const cipher = crypto.createCipheriv(ENCRYPTION_METHOD, encryptKey, encryptionIV)

  // Encrypts data and converts to hex and base64
  return Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex')).toString('base64')
}

/**
 * Decrypts the given data using the provided key.
 *
 * @param {Object} params - The parameters for decrypting the data.
 * @param {string} params.key - The key used for decryption.
 * @param {string} params.data - The data to be decrypted.
 * @returns {string} - The decrypted data.
 */
export function decryptData({
  key,
  data,
}: {
  key: string
  data: string
}): string {
  const encryptKey = generateKey(key)

  const buff = Buffer.from(data, 'base64')
  const decipher = crypto.createDecipheriv(ENCRYPTION_METHOD, encryptKey, encryptionIV)

  // Decrypts data and converts to utf8
  return decipher.update(buff.toString('utf8'), 'hex', 'utf8') + decipher.final('utf8')
}
