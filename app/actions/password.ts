'use server'

import { authOptions } from '@/lib/auth'
import { NewPasswordSchema, validateNewPassword } from '@/schemas/password'
import { encryptData } from '@/lib/encrypt'
import { DEFAULT_COST_SALT, NEXT_SECRET } from '@/lib/constants'

import prisma from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { getServerSession } from 'next-auth'
import z from 'zod'

// Create new password for user
export async function createPassword(data: z.infer<typeof NewPasswordSchema>) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  const result = validateNewPassword(data)

  if (!result.success) {
    return { message: result.error.message, status: 422, data: null }
  }

  // TODO: Check that it doesn't already have a password in the database.

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

    const pwEncrypt = encryptData({ key: NEXT_SECRET, data: data.password })

    return { data: pwEncrypt, status: 201 }
  } catch (e) {
    return { message: "The password couldn't be created, try again anew.", status: 400 }
  }
}
