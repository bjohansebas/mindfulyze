'use server'

import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import type { z } from 'zod'

import { prisma } from '@mindfulyze/database'
import {
  BAD_REQUEST_CODE,
  CONFLICT_CODE,
  CREATED_CODE,
  DEFAULT_COST_SALT,
  NEXTAUTH_SECRET,
  UNAUTHORIZED_CODE,
  validateSchema,
} from '@mindfulyze/utils'

import { NewPasswordSchema } from '@/schemas/password'
import type { ActionResponse } from '@/types'
import { authOptions } from '@lib/auth'
import { encryptData } from '@lib/encryption'
import { getUser } from './user'

export async function createPassword(data: z.infer<typeof NewPasswordSchema>): Promise<ActionResponse<string>> {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { message: 'You must be logged in.', status: UNAUTHORIZED_CODE, data: null }
  }

  const result = validateSchema(NewPasswordSchema, data)

  if (!result.success) {
    return { message: result.error.message, status: 422, data: null }
  }

  const user = await getUser()

  if (user.data?.password != null) {
    return { message: 'The password cannot be overwritten.', status: CONFLICT_CODE, data: null }
  }

  try {
    const hashedPassword = await bcrypt.hash(data.password, DEFAULT_COST_SALT)

    await prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: session.user.id,
      },
    })

    const pwEncrypt = await encryptPassword(data.password)

    return { data: pwEncrypt, status: CREATED_CODE }
  } catch (e) {
    return { message: "The password couldn't be created, try again anew.", status: BAD_REQUEST_CODE, data: null }
  }
}

export async function encryptPassword(password: string) {
  const dataEncrypt = encryptData({ key: NEXTAUTH_SECRET, data: password })

  return dataEncrypt
}
