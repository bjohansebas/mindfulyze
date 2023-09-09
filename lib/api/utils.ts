import prisma from '@/lib/prisma'
import { Template as TemplateProps, Thought as ThoughtProps } from '@prisma/client'


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

export async function getTemplatesByUser({
  // sort = "createdAt",
  userId,
}: {
  // sort: "createdAt"; // always descending
  userId: string
}): Promise<TemplateProps[]> {
  return await prisma.template.findMany({
    where: {
      userId,
    },
    orderBy: {
      // [sort]: "desc",
      createdAt: 'desc',
    },
  })
}
