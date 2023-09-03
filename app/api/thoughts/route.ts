import { getServerSession } from 'next-auth'

import { authOptions } from '@/lib/auth'
import { NEXT_SECRET } from '@/lib/constants'
import prisma from '@/lib/prisma'
import { decryptData, encryptData } from '@/lib/encrypt'
import { createFile, downloadFile } from '@/lib/supabase'
import { NextResponse } from 'next/server'
import { getThoughtsByUser } from '@/lib/api/utils'
import { validateThought } from '@/schemas/thought'
import { createId } from '@/lib/utils'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return NextResponse.json({ message: 'You must be logged in.', data: [] }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  // const sort = searchParams.get("sort");
  const page = searchParams.get('page')

  try {
    const response = await getThoughtsByUser({
      // sort,
      page,
      userId: session.user.id,
    })

    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })

    const thoughts = await Promise.all(
      response.map(async ({ url, ...res }) => {
        const data = await downloadFile({ name: url })
        const textEncrypt = await data.data?.text()

        if (!textEncrypt) return { text: '', ...res }

        const textDecrypt = decryptData({ key: password, data: textEncrypt })

        return { text: textDecrypt, ...res }
      }),
    )

    return NextResponse.json(thoughts, { status: 200 })
  } catch (e) {
    return NextResponse.json({ message: 'Not found thoughts', data: [] }, { status: 400 })
  }
}

// Get thoughts of user
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return NextResponse.json({ message: 'You must be logged in.', data: null }, { status: 401 })
  }

  const data = await request.json()

  const result = validateThought({ created: new Date(data.created), text: data.text })

  if (!result.success) {
    return { message: result.error.message, status: 422 }
  }

  try {
    const password = decryptData({ key: NEXT_SECRET, data: session.user.pw })
    const textEncrypt = encryptData({ key: password, data: data.text.withFormat })

    const uid = createId()
    const file = await createFile({ name: `${uid}.html`, text: textEncrypt })

    if (!file.data?.path) {
      return NextResponse.json(
        { message: "The thought couldn't be created, try again anew.", data: null },
        { status: 400 },
      )
    }

    const response = await prisma.thought.create({
      data: {
        id: uid,
        url: file.data?.path,
        userId: session.user.id,
        createdAt: result.data.created,
      },
    })

    return NextResponse.json({ data: response }, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { message: "The thought couldn't be created, try again anew.", data: null },
      { status: 400 },
    )
  }
}
