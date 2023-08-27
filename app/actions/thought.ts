'use server'

import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'
import { ThoughtSchema, validateThought } from '@/schemas/thought'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

import * as z from 'zod'

// Create new thought for user
export async function createThought(data: z.infer<typeof ThoughtSchema>) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return { message: 'You must be logged in.', status: 401 }
  }

  const result = validateThought({ created: new Date(data.created), text: data.text })

  if (!result.success) {
    return { message: result.error.message, status: 422 }
  }

  try {
    const response = await prisma.thought.create({
      data: {
        text: result.data.text.withFormat,
        userId: session.user.id,
        createdAt: result.data.created,
      },
    })

    revalidatePath('/home')

    return { data: response, status: 201 }
  } catch (e) {
    return { message: "The thought couldn't be created, try again anew.", status: 400 }
  }
}

// Get thoughts of user
export async function getThoughts() {
  const session = await getServerSession(authOptions)

  if (!session?.user.id) {
    return { message: 'You must be logged in.', status: 401, data: [] }
  }

  try {
    const response = await prisma.thought.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return { data: response, status: 200 }
  } catch (e) {
    return { message: 'Not found thoughts', status: 404, data: [] }
  }
}
