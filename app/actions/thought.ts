'use server'

import { authOptions } from '@/lib/auth'
import { NEXT_SECRET } from '@/lib/constants'
import { decryptData, encryptData } from '@/lib/encrypt'
import prisma from '@/lib/prisma'
import { createFile, downloadFile } from '@/lib/supabase'
import { createId } from '@/lib/utils'
import { ThoughtSchema, validateThought } from '@/schemas/thought'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

import * as z from 'zod'

// Create new thought for user
export async function createThought(data: z.infer<typeof ThoughtSchema>) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401 }
  }

  const result = validateThought({ created: new Date(data.created), text: data.text })

  if (!result.success) {
    return { message: result.error.message, status: 422 }
  }

  try {
    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })
    const textEncrypt = encryptData({ key: password, data: data.text.withFormat })
    const uid = createId()
    const file = await createFile({ name: `${uid}.html`, text: textEncrypt })

    if (!file.data?.path) {
      return { message: "The thought couldn't be created, try again anew.", status: 400 }
    }

    const response = await prisma.thought.create({
      data: {
        id: uid,
        url: file.data?.path,
        userId: session.user.id,
        createdAt: result.data.created,
      },
    })

    revalidatePath('/home')

    return { data: response, status: 201 }
  } catch (e) {
    return { message: "The thought couldn't be created, try again anew.", status: 400 }
  }
}

// Get thoughts of user
export async function getThoughts() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: [] }
  }

  try {
    const response = await prisma.thought.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })

    const thoughts = await Promise.all(
      response.map(async ({ url, ...res }) => {
        const data = await downloadFile({ name: url })
        const textEncrypt = await data.data?.text()

        if (!textEncrypt) return { text: '', ...res }

        const textDecrypt = decryptData({ key: password, data: textEncrypt })

        return { text: textDecrypt, ...res }
      }),
    )

    return { data: thoughts, status: 200 }
  } catch (e) {
    return { message: 'Not found thoughts', status: 404, data: [] }
  }
}
