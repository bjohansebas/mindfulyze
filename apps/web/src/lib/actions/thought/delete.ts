'use server'

import { prisma } from '@mindfulyze/database'
import { BAD_REQUEST_CODE } from '@mindfulyze/utils'

import { withActionSession } from '@lib/auth/utils'
import { deleteFile } from '@lib/supabase'
import type { ActionResponse } from 'types/index'

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
