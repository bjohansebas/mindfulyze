import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

import { validateThought } from 'schemas/thought'

import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'

// GET /api/thoughts
// Get thoughts of user
export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.id) {
    return NextResponse.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  try {
    const response = await prisma.thought.findMany({
      where: {
        userId: session.user.id,
      },
    })

    return NextResponse.json(response)
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return NextResponse.json({ error: e.name, message: 'Not found thought' }, { status: 404 })
    }
  }
}

// POST /api/thoughts
// Create new thought for user
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  const result = validateThought(await req.json())

  if (!result.success) {
    return NextResponse.json({ error: JSON.parse(result.error.message) }, { status: 422 })
  }

  try {
    const response = await prisma.thought.create({
      data: {
        text: result.data.text.withFormat,
        userId: session.user.id,
        createdAt: result.data.created,
      },
    })

    return NextResponse.json(response)
  } catch (e) {
    return NextResponse.json(e, { status: 400 })
  }
}
