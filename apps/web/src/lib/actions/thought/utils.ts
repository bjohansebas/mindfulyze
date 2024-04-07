import { prisma } from '@mindfulyze/database'

import type { Thought as ThoughtProps } from '@prisma/client'
import { isValid } from 'date-fns'

export const THOUGHTS_PER_PAGE = 10

export async function getFilterThoughtsByUser({
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
    take: THOUGHTS_PER_PAGE,
    ...(page && {
      skip: (page - 1) * THOUGHTS_PER_PAGE,
    }),
  })
}
