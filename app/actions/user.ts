'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { SetPasswordSchema } from '@/schemas/password'
import bcrypt from 'bcrypt'
import z from 'zod'

import { getServerSession } from 'next-auth'

export async function getUser() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  try {
    const response = await prisma.user.findUniqueOrThrow({
      where: {
        id: session.user.id,
      },
    })

    return { data: response, status: 200 }
  } catch (e) {
    return { message: "The user couldn't be found, try again.", status: 400, data: null }
  }
}

export async function verifyPassword(data: z.infer<typeof SetPasswordSchema>) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return false
  }

  try {
    const response = await prisma.user.findUniqueOrThrow({
      where: {
        id: session.user.id,
      },
    })

    if (response.password == null) return false

    const isMatch = await bcrypt.compare(data.password, response.password)

    return isMatch
  } catch (e) {
    return false
  }
}
