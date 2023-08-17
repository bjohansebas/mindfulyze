import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { validateThought } from '@/schemas/thought'
import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

// POST /api/thoughts
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  const result = validateThought(await req.json())

  if (!result.success) {
    return NextResponse.json({ error: JSON.parse(result.error.message) }, { status: 422 })
  }

  const response = await prisma.thought.create({
    data: {
      text: result.data.text,
      user: {
        connect: {
          email: session?.user.email,
        },
      },
    },
  })

  return NextResponse.json({ response })
}
