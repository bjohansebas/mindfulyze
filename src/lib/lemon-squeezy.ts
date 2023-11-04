import crypto from 'crypto'
import { Readable } from 'stream'
import rawBody from 'raw-body'

import { env } from './env'

/**
 * Verifies the signature of a request.
 * @param request - The request object containing the request body and headers.
 * @returns An object with `data` set to `true` or `false` depending on whether the signature is valid, and the request body.
 */
export async function verifySignature({ request }: { request: Request }) {
  try {
    const body = await rawBody(Readable.from(Buffer.from(await request.text())))

    const sigString = request.headers.get('X-Signature')
    const secret = env.LEMON_SQUEEZY_SECRET

    const hmac = crypto.createHmac('sha256', secret)
    const digest = Buffer.from(hmac.update(body).digest('hex'), 'utf8')
    const signature = Buffer.from(Array.isArray(sigString) ? sigString.join('') : sigString || '', 'utf8')

    if (!crypto.timingSafeEqual(digest, signature)) {
      return { data: false, body }
    }

    return { data: true, body }
  } catch (error) {
    throw new Error(`Failed to verify signature: ${error.message}`)
  }
}
