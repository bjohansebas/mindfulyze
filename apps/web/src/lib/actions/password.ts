'use server'

import bcrypt from 'bcrypt'
import type { z } from 'zod'

import { prisma } from '@mindfulyze/database'
import { BAD_REQUEST_CODE, CONFLICT_CODE, CREATED_CODE, DEFAULT_COST_SALT, NEXTAUTH_SECRET } from '@mindfulyze/utils'

import { getUser } from '@/app/actions/user'
import { withActionSession } from '@lib/auth/utils'
import { encryptData } from '@lib/encryption'
import { NewPasswordSchema } from '@schemas/password'
import type { ActionResponse } from 'types/index'

export async function createPassword(input: z.infer<typeof NewPasswordSchema>): Promise<ActionResponse<string>> {
  const { data: response, status, message } = await withActionSession(NewPasswordSchema, input)

  if (response == null) return { data: response, status, message }
  const { session, data } = response

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

    const pwEncrypt = await encryptPasswordSession(data.password)

    return { data: pwEncrypt, status: CREATED_CODE }
  } catch (e) {
    return { message: "The password couldn't be created, try again anew.", status: BAD_REQUEST_CODE, data: null }
  }
}

export async function encryptPasswordSession(password: string) {
  const dataEncrypt = encryptData({ key: NEXTAUTH_SECRET, data: password })

  return dataEncrypt
}
