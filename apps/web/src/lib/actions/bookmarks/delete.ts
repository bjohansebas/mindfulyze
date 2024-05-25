'use server'

import { withActionSessionAndSchema } from '@lib/auth/utils'
import { prisma } from '@mindfulyze/database'
import { BAD_REQUEST_CODE, CREATED_CODE } from '@mindfulyze/utils'
import { DeleteThoughtFromBookmarkSchema } from '@schemas/bookmark'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'

export async function removeBookmarkFromThought(input: z.infer<typeof DeleteThoughtFromBookmarkSchema>) {
  const { data: response, status, message } = await withActionSessionAndSchema(DeleteThoughtFromBookmarkSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    data: { id },
  } = response

  try {
    const responseCreate = await prisma.bookmarkThoughts.delete({
      where: {
        id,
      },
    })

    revalidatePath('/home')
    return { data: responseCreate, status: CREATED_CODE }
  } catch (e) {
    return { message: "The bookmakrs couldn't be removed, try again anew.", status: BAD_REQUEST_CODE, data: null }
  }
}
