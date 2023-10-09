'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { SetPasswordSchema } from '@/schemas/password'
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'
import z from 'zod'

import {
  DeleteAccountSchemaForm,
  EmailFormSchema,
  NameFormSchema,
  validateDeleteAccount,
  validateEmail,
  validateName,
} from '@/schemas/user'
import { getServerSession } from 'next-auth'
import { deleteAllTemplates } from './templates'
import { deleteAllThoughts } from './thoughts'

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

export async function updateName(data: z.infer<typeof NameFormSchema>) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return false
  }

  const result = validateName(data)

  if (!result.success) {
    return false
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name: data.name,
      },
    })

    return true
  } catch (e) {
    return false
  }
}

export async function updateEmail(data: z.infer<typeof EmailFormSchema>) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return false
  }

  const result = validateEmail(data)

  if (!result.success) {
    return false
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        email: data.email,
      },
    })

    return true
  } catch (e) {
    return false
  }
}

export async function updateImage(data: string | undefined | null) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { data: null }
  }

  if (data == null || data.trim() === '') {
    return { data: null }
  }

  try {
    const { secure_url } = await cloudinary.v2.uploader.upload(data, {
      public_id: session.user.id,
      folder: 'avatars',
      overwrite: true,
      invalidate: true,
    })

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: secure_url,
      },
    })

    return { data: secure_url }
  } catch (e) {
    return { data: null }
  }
}

export async function deleteAccount(data: z.infer<typeof DeleteAccountSchemaForm>) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { data: false }
  }

  const result = validateDeleteAccount(data)

  if (!result.success) {
    return false
  }

  try {
    const isMatch = await verifyPassword({ password: data.password })

    if (!isMatch) return false

    await Promise.allSettled([
      deleteAllThoughts(),
      deleteAllTemplates(),
      cloudinary.v2.uploader.destroy(`avatars/${session?.user?.id}`, {
        invalidate: true,
      }),
    ])

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    })

    return { data: true }
  } catch (e) {
    return { data: false }
  }
}
