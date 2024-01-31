'use server'

import { Thought as ThoughtProps } from '@prisma/client'

import { prisma } from '@mindfulyze/database'
import { NEXT_SECRET, NOT_FOUND_CODE, NOT_FOUND_THOUGHTS, OK_CODE, UNAUTHORIZED_CODE } from '@mindfulyze/utils'
import { ERROR_LOGIN_REQUIRED } from '@mindfulyze/utils'
import { decryptData } from '@mindfulyze/utils'

import dayjs from 'dayjs'
import { getServerSession } from 'next-auth'

import { ActionResponse } from '@/types'
import { Thought } from '@/types/thought'
import { authOptions } from '@lib/auth'
import { downloadFile } from '@lib/supabase'

export async function getThoughtsByUser({
  sort = 'createdAt',
  page,
  userId,
}: {
  sort?: 'createdAt'
  page: number | null
  userId: string
}): Promise<ThoughtProps[]> {
  return await prisma.thought.findMany({
    where: {
      userId,
    },
    orderBy: {
      [sort]: 'desc',
    },
    take: 10,
    ...(page && {
      skip: (page - 1) * 10,
    }),
  })
}

export async function getThoughts({ page }: { page: number }): Promise<ActionResponse<Thought[]>> {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: ERROR_LOGIN_REQUIRED, status: UNAUTHORIZED_CODE, data: [] }
  }

  try {
    const response = await getThoughtsByUser({
      page,
      userId: session.user.id,
    })

    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })

    const thoughts = await Promise.all(
      response.map(async ({ url, bucket, updatedAt, ...res }) => {
        const data = await downloadFile({ name: `${url}?bust=${dayjs(new Date()).valueOf()}`, bucket })
        const textEncrypt = await data.data?.text()

        if (!textEncrypt) return { text: '', ...res, updatedAt }

        const textDecrypt = decryptData({ key: password, data: textEncrypt })

        return { text: textDecrypt, updatedAt, ...res }
      }),
    )

    return { data: thoughts, status: OK_CODE }
  } catch (e) {
    return { message: NOT_FOUND_THOUGHTS, status: NOT_FOUND_CODE, data: [] }
  }
}

const ITEMS_PER_PAGE = 10

export async function getThoughtsPages() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: ERROR_LOGIN_REQUIRED, status: UNAUTHORIZED_CODE, data: 0 }
  }

  try {
    const response = await prisma.thought.count({
      where: {
        userId: session.user.id,
      },
    })

    return { data: Math.ceil(response / ITEMS_PER_PAGE), status: 200 }
  } catch (e) {
    return { message: NOT_FOUND_THOUGHTS, status: NOT_FOUND_CODE, data: 0 }
  }
}
