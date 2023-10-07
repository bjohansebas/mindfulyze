import prisma from '@/lib/prisma'
import { Template as TemplateProps } from '@prisma/client'

export async function getUserById({
  id,
}: {
  id: string
}) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      Subscription: true,
    },
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

export async function getTemplatesByDefault({
  userId,
}: {
  userId: string
}): Promise<TemplateProps | null> {
  return await prisma.template.findFirst({
    where: {
      userId,
      default: true,
    },
  })
}
