'use server'

import { prisma } from '@mindfulyze/database'

import { auth } from '@lib/auth'

export async function getThoughtByIdWithOutText(id: string) {
  const session = await auth()

  if (!session?.user.id || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: null }
  }

  try {
    const thought = await prisma.thought.findUniqueOrThrow({
      where: {
        id: id,
        userId: session.user.id,
      },
    })

    return { data: thought, status: 200 }
  } catch (e) {
    return { message: 'Not found template', status: 404, data: null }
  }
}
