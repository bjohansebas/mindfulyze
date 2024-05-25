'use server'

import { type Bookmark, prisma } from '@mindfulyze/database'
import { NOT_FOUND_CODE, OK_CODE } from '@mindfulyze/utils'

import { withActionSession } from '@lib/auth/utils'
import type { ActionResponse } from 'types/index'

export async function getBookmarks(): Promise<ActionResponse<Bookmark[]>> {
  const { data: response, status, message } = await withActionSession()

  if (response == null) return { data: response, status, message }
  const { session } = response

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId: session.user.id },
      include: {
        thoughts: true,
      },
    })

    return { data: bookmarks, status: OK_CODE }
  } catch (e) {
    return { message: 'Unkwon error', status: NOT_FOUND_CODE, data: null }
  }
}
