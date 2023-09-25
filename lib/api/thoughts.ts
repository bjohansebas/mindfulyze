import { ThoughtResponse } from '@/app/actions/thoughts'
import prisma from '@/lib/prisma'
import { Thought as ThoughtProps } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth'
import { NEXT_SECRET } from '../constants'
import { decryptData } from '../encrypt'
import { downloadFile } from '../supabase'
import { toTimestamp } from '../utils'

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
      // createdAt: 'desc',
      createdAt: 'asc',
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
        const data = await downloadFile({ name: `${url}?bust=${toTimestamp(updatedAt.toDateString())})`, bucket })
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
