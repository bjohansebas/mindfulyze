'use server'

import { prisma } from '@mindfulyze/database'
import { NEXTAUTH_SECRET } from '@mindfulyze/utils'
import { SUPABASE_BUCKET_THOUGHTS, generateCUID } from '@mindfulyze/utils'

import { revalidatePath } from 'next/cache'

import { getThoughtById } from '@actions/thought'
import { auth } from '@lib/auth'
import { decryptData, encryptData } from '@lib/encryption'
import { createFile, deleteFile } from '@lib/supabase'
import { getTemplateById, getTemplateDefault } from './templates'

export async function getThoughtByIdWithOutText(id: string) {
  const session = await auth()

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
  const session = await auth()

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
    const password = decryptData({ key: NEXTAUTH_SECRET, data: session.user.pw })
    const textEncrypt = encryptData({ key: password, data: textForThought })

    const uid = generateCUID()
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

// Create new thought for user
export async function deleteThought(id: string) {
  const session = await auth()

  if (!session?.user) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }

  try {
    const thought = await getThoughtById({ id })

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
