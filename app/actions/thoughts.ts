'use server'

import { Thought } from '@/@types/thought'
import { getThoughtsByUser } from '@/lib/api/utils'
import { authOptions } from '@/lib/auth'
import { NEXT_SECRET } from '@/lib/constants'
import { SUPABASE_BUCKET_THOUGHTS } from '@/lib/constants/supabase'
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
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  const result = validateThought({ created: new Date(data.created), text: data.text })

  if (!result.success) {
    return { message: result.error.message, status: 422 }
  }

  try {
    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })
    const textEncrypt = encryptData({ key: password, data: data.text.withFormat })

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
        createdAt: result.data.created,
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

// Get thoughts of user
export async function getThoughts(): Promise<ThoughtResponse> {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: [] }
  }

  try {
    const response = await getThoughtsByUser({
      // sort,
      page: '1',
      userId: session.user.id,
    })

    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })

    const thoughts = await Promise.all(
      response.map(async ({ url, bucket, ...res }) => {
        const data = await downloadFile({ name: url, bucket })
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
