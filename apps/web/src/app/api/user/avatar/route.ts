import { prisma } from '@mindfulyze/database'
import { BAD_REQUEST_CODE, OK_CODE } from '@mindfulyze/utils'

import cloudinary from 'cloudinary'
import { NextResponse } from 'next/server'
import type { z } from 'zod'

import { update } from '@lib/auth'
import { withActionSessionAndSchema } from '@lib/auth/utils'
import { UpdateAvatarSchema } from '@schemas/user'

// PUT /api/user/avatar – edit a avatar of user
export async function PUT(req: Request) {
  const {
    data: response,
    status,
    message,
  } = await withActionSessionAndSchema(UpdateAvatarSchema, (await req.json()) as z.infer<typeof UpdateAvatarSchema>)

  if (response == null) return NextResponse.json({ data: response, message }, { status })

  const {
    session,
    data: { data },
  } = response

  try {
    const { secure_url } = await cloudinary.v2.uploader.upload(data, {
      public_id: session.user.id,
      folder: 'avatars',
      overwrite: true,
      invalidate: true,
    })

    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: secure_url,
      },
    })

    await update({ user: { image: secure_url } })

    return NextResponse.json({ data: secure_url }, { status: OK_CODE })
  } catch (e) {
    return NextResponse.json({ data: null }, { status: BAD_REQUEST_CODE })
  }
}
