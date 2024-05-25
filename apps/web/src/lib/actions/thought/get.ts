'use server'

import { prisma } from '@mindfulyze/database'
import {
  ERROR_LOGIN_REQUIRED,
  NEXTAUTH_SECRET,
  NOT_FOUND_CODE,
  NOT_FOUND_THOUGHTS,
  OK_CODE,
  UNAUTHORIZED_CODE,
} from '@mindfulyze/utils'

import { isValid } from 'date-fns'
import type { z } from 'zod'

import { withActionSessionAndSchema } from '@lib/auth/utils'
import { decryptData } from '@lib/encryption'
import { GetThoughtByIdSchema, GetThoughtsPagesSchema, GetThoughtsSchema } from '@lib/schemas/thought'
import { downloadFile } from '@lib/supabase'
import type { ActionResponse } from 'types/index'
import type { Thought } from 'types/thought'
import { THOUGHTS_PER_PAGE, getFilterThoughtsByUser } from './utils'

export async function getThoughts(input: z.infer<typeof GetThoughtsSchema>): Promise<ActionResponse<Thought[]>> {
  const { data: response, status, message } = await withActionSessionAndSchema(GetThoughtsSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    session,
    data: { page, fromDate, toDate },
  } = response

  if (session.user.pw == null) return { data: null, status: UNAUTHORIZED_CODE, message: ERROR_LOGIN_REQUIRED }

  try {
    const response = await getFilterThoughtsByUser({
      page,
      fromDate,
      toDate,
      userId: session.user.id,
    })

    const password = decryptData({ key: NEXTAUTH_SECRET, data: session.user.pw })

    const thoughts = await Promise.all(
      response.map(async ({ url, bucket, updatedAt, bookmarks, ...res }) => {
        const data = await downloadFile({ name: `${url}?bust=${new Date().valueOf()}`, bucket })
        const textEncrypt = await data.data?.text()

        if (!textEncrypt) return { text: '', ...res, updatedAt }

        const textDecrypt = decryptData({ key: password, data: textEncrypt })

        return { text: textDecrypt, updatedAt, bookmarks: bookmarks || [], ...res }
      }),
    )

    return { data: thoughts, status: OK_CODE }
  } catch (e) {
    return { message: NOT_FOUND_THOUGHTS, status: NOT_FOUND_CODE, data: null }
  }
}

export async function getThoughtsPages(input: z.infer<typeof GetThoughtsPagesSchema>): Promise<ActionResponse<number>> {
  const { data: response, status, message } = await withActionSessionAndSchema(GetThoughtsPagesSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    session,
    data: { fromDate, toDate },
  } = response

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

    return { data: Math.ceil(response / THOUGHTS_PER_PAGE), status: OK_CODE }
  } catch (e) {
    return { message: NOT_FOUND_THOUGHTS, status: NOT_FOUND_CODE, data: null }
  }
}

export async function getThoughtById(input: z.infer<typeof GetThoughtByIdSchema>) {
  const { data: response, status, message } = await withActionSessionAndSchema(GetThoughtByIdSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    session,
    data: { id },
  } = response

  if (session.user.pw == null) return { data: null, status: UNAUTHORIZED_CODE, message: ERROR_LOGIN_REQUIRED }

  try {
    const { url, bucket, updatedAt, ...res } = await prisma.thought.findUniqueOrThrow({
      where: {
        id,
        userId: session.user.id,
      },
    })

    const dataThought = await downloadFile({ name: `${url}?bust=${new Date().valueOf()}`, bucket })

    if (dataThought.data == null) {
      return {
        message: 'The thought was not found.',
        data: null,
        status: NOT_FOUND_CODE,
      }
    }

    const text = await dataThought.data.text()
    const password = decryptData({ key: NEXTAUTH_SECRET, data: session.user.pw })
    const textDecrypt = decryptData({ key: password, data: text })

    return { data: { text: textDecrypt, updatedAt, ...res, url, bucket }, status: OK_CODE }
  } catch (e) {
    return { message: 'Not found template', status: NOT_FOUND_CODE, data: null }
  }
}
