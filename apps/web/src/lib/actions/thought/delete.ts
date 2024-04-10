'use server'

import { prisma } from '@mindfulyze/database'
import { BAD_REQUEST_CODE, CREATED_CODE } from '@mindfulyze/utils'

import { withActionSession, withActionSessionAndSchema } from '@lib/auth/utils'
import { deleteFile } from '@lib/supabase'
import { DeleteThoughtByIdSchema } from '@schemas/thought'
import { revalidatePath } from 'next/cache'
import type { ActionResponse } from 'types/index'
import type { z } from 'zod'
import { getThoughtById } from './get'

export async function deleteAllThoughts(): Promise<ActionResponse<boolean>> {
  const { data: response, status, message } = await withActionSession()

  if (response == null) return { data: response, status, message }
  const { session } = response

  try {
    const thoughts = await prisma.thought.findMany({ where: { userId: session.user.id } })

    if (thoughts.length === 0) {
      return { message: "The thoughts couldn't be deleted, try again anew.", status: BAD_REQUEST_CODE, data: false }
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
    return { message: "The thoughts couldn't be deleted, try again anew.", status: BAD_REQUEST_CODE, data: false }
  }
}

export async function deleteThought(input: z.infer<typeof DeleteThoughtByIdSchema>): Promise<ActionResponse<boolean>> {
  const { data: response, status, message } = await withActionSessionAndSchema(DeleteThoughtByIdSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    data: { id },
  } = response

  try {
    const thought = await getThoughtById({ id })

    if (!thought.data) {
      return { message: "The thought couldn't be deleted, try again anew.", status: BAD_REQUEST_CODE, data: false }
    }

    await prisma.thought.delete({
      where: {
        id: thought.data.id,
      },
    })

    await deleteFile({ name: thought.data.url, bucket: thought.data.bucket })

    revalidatePath('/home')

    return { data: true, status: CREATED_CODE }
  } catch (e) {
    return { message: "The thought couldn't be deleted, try again anew.", status: BAD_REQUEST_CODE, data: false }
  }
}
