import { ThoughtResponse } from '@/app/actions/thoughts'
import { prisma } from '@mindfulyze/database'
import { NEXT_SECRET, decryptData } from '@mindfulyze/utils'
import { Thought as ThoughtProps } from '@prisma/client'
import dayjs from 'dayjs'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { downloadFile } from '../supabase'

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

// Get thoughts of user
export async function getThoughts(): Promise<ThoughtResponse> {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: [] }
  }

  try {
    const response = await getThoughtsByUser({
      // sort,
      page: '1',
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

    return { data: thoughts, status: 200 }
  } catch (e) {
    return { message: 'Not found thoughts', status: 404, data: [] }
  }
}