'use server'

import { authOptions } from '@/lib/auth'
import { createFile, deleteFile, downloadFile, updateFile } from '@/lib/supabase'
import { createId, parseDate } from '@/lib/utils'
import { ThoughtSchema } from '@/schemas/thought'
import { validatePartialThought } from '@/schemas/thought'
import { Thought } from '@/types/thought'
import { prisma } from '@mindfulyze/database'
import { decryptData, encryptData } from '@mindfulyze/utils'
import { NEXT_SECRET } from '@mindfulyze/utils'
import { SUPABASE_BUCKET_THOUGHTS } from '@mindfulyze/utils'
import { getTemplateById, getTemplateDefault } from './templates'

import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

import dayjs from 'dayjs'
import * as z from 'zod'

export async function getThoughtById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: null }
  }

  try {
    const { url, bucket, updatedAt, ...res } = await prisma.thought.findUniqueOrThrow({
      where: {
        id: id,
        userId: session.user.id,
      },
    })

    const dataThought = await downloadFile({ name: `${url}?bust=${dayjs(new Date()).valueOf()}`, bucket })

    if (dataThought.data == null) {
      return {
        message: 'The thought was not found.',
        data: null,
        status: 404,
      }
    }

    const text = await dataThought.data.text()
    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })
    const textDecrypt = decryptData({ key: password, data: text })

    return { data: { text: textDecrypt, updatedAt, ...res, url, bucket }, status: 200 }
  } catch (e) {
    return { message: 'Not found template', status: 404, data: null }
  }
}

export async function getThoughtByIdWithOutText(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: null }
  }

  try {
    const thought = await prisma.thought.findUniqueOrThrow({
      where: {
        id: id,
        userId: session.user.id,
      },
    })

    return { data: thought, status: 200 }
  } catch (e) {
    return { message: 'Not found template', status: 404, data: null }
  }
}

// Create new thought for user
export async function createThought(idTemplate?: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  let textForThought = ''

  if (idTemplate == null) {
    const template = await getTemplateDefault()

    if (template != null) {
      textForThought = template.data?.text || ''
    }
  } else {
    const template = await getTemplateById(idTemplate)

    if (template != null) {
      textForThought = template.data?.text || ''
    }
  }

  try {
    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })
    const textEncrypt = encryptData({ key: password, data: textForThought })

    const uid = createId()
    const file = await createFile({ name: `${uid}.html`, text: textEncrypt, bucket: SUPABASE_BUCKET_THOUGHTS })

    if (!file.data?.path) {
      return { message: "The thought couldn't be created, try again anew.", status: 400, data: null }
    }

    const response = await prisma.thought.create({
      data: {
        id: uid,
        url: file.data?.path,
        bucket: SUPABASE_BUCKET_THOUGHTS,
        userId: session.user.id,
      },
    })

    revalidatePath('/home')

    return { data: response, status: 201 }
  } catch (e) {
    return { message: "The thought couldn't be created, try again anew.", status: 400, data: null }
  }
}

export interface ThoughtResponse {
  data: Thought[]
  message?: string
  status: number
}

// Create new thought for user
export async function updateThought(id: string, data: z.infer<typeof ThoughtSchema>) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  const result = validatePartialThought({
    created: data.created,
    textWithFormat: data.textWithFormat,
  })

  if (!result.success) {
    return { message: result.error.message, status: 422 }
  }

  const thought = await getThoughtById(id)

  if (thought.status !== 200 || thought.data == null) {
    return { ...thought, data: false }
  }

  try {
    if (data.textWithFormat !== thought.data?.text) {
      const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })
      const textEncrypt = encryptData({ key: password, data: data.textWithFormat })

      const file = await updateFile({
        name: `${thought.data?.id}.html`,
        text: textEncrypt,
        bucket: thought.data.bucket,
      })

      if (!file.data?.path) {
        return { message: "The thought couldn't be updated, try again anew.", status: 400, data: false }
      }
    }

    if (parseDate(data.created) !== parseDate(thought.data.createdAt)) {
      await prisma.thought.update({
        data: {
          createdAt: data.created,
        },
        where: {
          id: thought.data.id,
        },
      })
    }

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be updated, try again anew.", status: 400, data: false }
  }
}

export async function updateDateThought(id: string, date: Date) {
  const session = await getServerSession(authOptions)
  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  const thought = await getThoughtById(id)

  if (thought.status !== 200 || thought.data == null) {
    return { ...thought, data: false }
  }

  try {
    if (parseDate(date) !== parseDate(thought.data.createdAt)) {
      await prisma.thought.update({
        data: {
          createdAt: date,
        },
        where: {
          id: thought.data.id,
        },
      })
    }

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be updated, try again anew.", status: 400, data: false }
  }
}

// Create new thought for user
export async function deleteThought(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }

  try {
    const thought = await getThoughtById(id)

    if (!thought.data) {
      return { message: "The thought couldn't be deleted, try again anew.", status: 400, data: false }
    }

    await prisma.thought.delete({
      where: {
        id: thought.data.id,
      },
    })

    await deleteFile({ name: thought.data.url, bucket: thought.data.bucket })

    revalidatePath('/home')

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The thought couldn't be deleted, try again anew.", status: 400, data: false }
  }
}

// Create new thought for user
export async function deleteAllThoughts() {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }

  try {
    const thoughts = await prisma.thought.findMany({ where: { userId: session.user.id } })

    if (thoughts.length === 0) {
      return { message: "The thoughts couldn't be deleted, try again anew.", status: 400, data: false }
    }

    await Promise.allSettled(
      thoughts.map(async ({ url, bucket }) => {
        await deleteFile({ name: url, bucket })
      }),
    )

    await prisma.thought.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The thoughts couldn't be deleted, try again anew.", status: 400, data: false }
  }
}
