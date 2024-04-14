'use server'

import { withActionSessionAndSchema } from '@lib/auth/utils'
import { prisma } from '@mindfulyze/database'
import { BAD_REQUEST_CODE, CREATED_CODE } from '@mindfulyze/utils'
import { AddThoughtToBookmarkSchema, CreateBookmarkSchema } from '@schemas/bookmark'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'

export async function createBookmark(input: z.infer<typeof CreateBookmarkSchema>) {
  const { data: response, status, message } = await withActionSessionAndSchema(CreateBookmarkSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    session,
    data: { name },
  } = response

  try {
    const responseCreate = await prisma.bookmark.create({
      data: {
        userId: session.user.id,
        name,
      },
    })
    revalidatePath('/home')
    return { data: responseCreate, status: CREATED_CODE }
  } catch (e) {
    return { message: "The bookmakrs couldn't be created, try again anew.", status: BAD_REQUEST_CODE, data: null }
  }
}

export async function addThoughtToBookmark(input: z.infer<typeof AddThoughtToBookmarkSchema>) {
  const { data: response, status, message } = await withActionSessionAndSchema(AddThoughtToBookmarkSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    data: { bookmarkId, thoughtId },
  } = response

  try {
    const responseCreate = await prisma.bookmarkThoughts.create({
      data: {
        bookmarkId,
        thoughtId,
      },
    })

    revalidatePath('/home')
    return { data: responseCreate, status: CREATED_CODE }
  } catch (e) {
    return { message: "The bookmakrs couldn't be created, try again anew.", status: BAD_REQUEST_CODE, data: null }
  }
}
