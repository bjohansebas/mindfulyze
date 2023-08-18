import { authOptions } from '@/lib/auth'
import { parse } from '@/lib/middleware/utils'
import prisma from '@/lib/prisma'

import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

// GET /api/thoughts/:key
// Get only thought by id
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.user.id) {
    return NextResponse.json({ message: 'You must be logged in.' }, { status: 401 })
  }

  const { fullKey } = parse(req)
  const [, , id] = fullKey.split('/')

  try {
    const response = await prisma.thought.findFirstOrThrow({
      where: {
        userId: session.user.id,
        id,
      },
    })

    return NextResponse.json(response)
  } catch (e) {
    if (e.name === 'NotFoundError') {
      return NextResponse.json({ error: e.name, message: 'Not found thought' }, { status: 404 })
    }
  }
}
