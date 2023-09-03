import prisma from '@/lib/prisma'
import { Thought as ThoughtProps } from '@prisma/client'

export async function getThoughtsByUser({
  // sort = "createdAt",
  page,
  userId,
}: {
  // sort: "createdAt"; // always descending
  page: string | null
  userId: string
}): Promise<ThoughtProps[]> {
  return await prisma.thought.findMany({
    where: {
      userId,
    },
    orderBy: {
      // [sort]: "desc",
      createdAt: 'desc',
    },
    take: 30,
    ...(page && {
      skip: (parseInt(page) - 1) * 30,
    }),
  })
}
