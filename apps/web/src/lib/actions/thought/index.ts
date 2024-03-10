'use server'

import type { Thought as ThoughtProps } from '@prisma/client'

import { decryptData } from '@lib/encryption'
import { prisma } from '@mindfulyze/database'
import { NEXTAUTH_SECRET, NOT_FOUND_CODE, NOT_FOUND_THOUGHTS, OK_CODE, UNAUTHORIZED_CODE } from '@mindfulyze/utils'
import { ERROR_LOGIN_REQUIRED } from '@mindfulyze/utils'

import { getServerSession } from 'next-auth'

import type { ActionResponse } from '@/types'
import type { Thought } from '@/types/thought'
import { authOptions } from '@lib/auth'
import { downloadFile } from '@lib/supabase'
import { isValid } from 'date-fns'

export async function getThoughtsByUser({
  sort = 'createdAt',
  page,
  userId,
  fromDate,
  toDate,
}: {
  sort?: 'createdAt'
  toDate?: string
  fromDate?: string
  page: number | null
  userId: string
}): Promise<ThoughtProps[]> {
  return await prisma.thought.findMany({
    where: {
      userId,
      createdAt: {
        gte: fromDate != null && isValid(new Date(fromDate)) ? fromDate : undefined, // Start of date range
        lte: toDate != null && isValid(new Date(toDate)) ? toDate : undefined, // End of date range
      },
    },
    orderBy: {
      [sort]: 'desc',
    },
    take: ITEMS_PER_PAGE,
    ...(page && {
      skip: (page - 1) * ITEMS_PER_PAGE,
    }),
  })
}

export async function getThoughts({
  page,
  fromDate,
  toDate,
}: { page: number; toDate?: string; fromDate?: string }): Promise<ActionResponse<Thought[]>> {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: ERROR_LOGIN_REQUIRED, status: UNAUTHORIZED_CODE, data: [] }
  }

  try {
    const response = await getThoughtsByUser({
      page,
      fromDate,
      toDate,
      userId: session.user.id,
    })

    const password = decryptData({ key: NEXTAUTH_SECRET, data: session.user.pw })

    const thoughts = await Promise.all(
      response.map(async ({ url, bucket, updatedAt, ...res }) => {
        const data = await downloadFile({ name: `${url}?bust=${new Date().valueOf()}`, bucket })
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

export async function getThoughtsPages({ toDate, fromDate }: { toDate?: string; fromDate?: string }) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: ERROR_LOGIN_REQUIRED, status: UNAUTHORIZED_CODE, data: 0 }
  }

  try {
    const response = await prisma.thought.count({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: fromDate != null && isValid(new Date(fromDate)) ? fromDate : undefined, // Start of date range
          lte: toDate != null && isValid(new Date(toDate)) ? toDate : undefined, // End of date range
        },
      },
    })

    return { data: Math.ceil(response / ITEMS_PER_PAGE), status: 200 }
  } catch (e) {
    return { message: NOT_FOUND_THOUGHTS, status: NOT_FOUND_CODE, data: 0 }
  }
}
