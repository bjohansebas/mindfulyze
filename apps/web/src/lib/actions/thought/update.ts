'use server'

import { prisma } from '@mindfulyze/database'
import { BAD_REQUEST_CODE, CREATED_CODE, NEXTAUTH_SECRET, OK_CODE, UNAUTHORIZED_CODE } from '@mindfulyze/utils'

import { compareAsc } from 'date-fns'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'

import { withActionSessionAndSchema } from '@lib/auth/utils'
import { decryptData, encryptData } from '@lib/encryption'
import { updateFile } from '@lib/supabase'
import { UpdateDateThoughtSchema, UpdateTextThoughtSchema } from '@schemas/thought'
import type { ActionResponse } from 'types/index'
import { getThoughtById } from './get'

export async function updateTextThought(
  input: z.infer<typeof UpdateTextThoughtSchema>,
): Promise<ActionResponse<boolean>> {
  const { data: response, status, message } = await withActionSessionAndSchema(UpdateTextThoughtSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    session,
    data: { id, text },
  } = response

  if (session.user.pw == null) {
    return { message: 'You must be logged in.', status: UNAUTHORIZED_CODE, data: null }
  }
  const thought = await getThoughtById({ id })

  if (thought.status !== OK_CODE || thought.data == null) {
    return { ...thought, data: false }
  }

  try {
    if (text !== thought.data.text) {
      const password = decryptData({ key: NEXTAUTH_SECRET, data: session.user.pw })
      const textEncrypt = encryptData({ key: password, data: text })

      const file = await updateFile({
        name: `${thought.data?.id}.html`,
        text: textEncrypt,
        bucket: thought.data.bucket,
      })

      if (!file.data?.path) {
        return { message: "The thought couldn't be updated, try again anew.", status: BAD_REQUEST_CODE, data: false }
      }
    }

    revalidatePath('/home')

    return { data: true, status: CREATED_CODE }
  } catch (e) {
    return { message: "The template couldn't be updated, try again anew.", status: BAD_REQUEST_CODE, data: false }
  }
}

export async function updateDateThought(
  input: z.infer<typeof UpdateDateThoughtSchema>,
): Promise<ActionResponse<boolean>> {
  const { data: response, status, message } = await withActionSessionAndSchema(UpdateDateThoughtSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    data: { id, created },
  } = response

  const thought = await getThoughtById({ id })

  if (thought.status !== OK_CODE || thought.data == null) {
    return { ...thought, data: false }
  }

  try {
    if (compareAsc(created, thought.data.createdAt) === 0) {
      await prisma.thought.update({
        data: {
          createdAt: created,
        },
        where: {
          id: thought.data.id,
        },
      })
    }

    revalidatePath('/home')

    return { data: true, status: CREATED_CODE }
  } catch (e) {
    return { message: "The template couldn't be updated, try again anew.", status: BAD_REQUEST_CODE, data: false }
  }
}
