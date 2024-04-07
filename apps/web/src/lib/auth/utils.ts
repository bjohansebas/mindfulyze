import { auth } from '@lib/auth'
import { OK_CODE, UNAUTHORIZED_CODE, UNPROCESSABLE_ENTITY, validateSchema } from '@mindfulyze/utils'
import type { Schema } from 'zod'

export async function withActionSession<S extends Schema, D extends Zod.infer<Schema>>(schema: S, data: D) {
  const session = await auth()

  if (!session?.user || !session.user.email) {
    return { message: 'You must be logged in.', status: UNAUTHORIZED_CODE, data: null }
  }

  const result = validateSchema(schema, data)

  if (!result.success) {
    return { message: result.error.message, status: UNPROCESSABLE_ENTITY, data: null }
  }

  return {
    message: 'OK',
    data: {
      session,
      data,
    },
    status: OK_CODE,
  }
}
