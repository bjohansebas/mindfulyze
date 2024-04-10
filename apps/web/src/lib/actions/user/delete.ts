'use server'

import { prisma } from '@mindfulyze/database'
import { BAD_REQUEST_CODE, OK_CODE } from '@mindfulyze/utils'

import cloudinary from 'cloudinary'
import type { z } from 'zod'

import { deleteAllTemplates } from '@/app/actions/templates'
import { verifyPassword } from '@/app/actions/user'
import { deleteAllThoughts } from '@actions/thought'
import { withActionSessionAndSchema } from '@lib/auth/utils'
import { DeleteAccountSchemaForm } from '@schemas/user'
import type { ActionResponse } from 'types/index'

export async function deleteAccount(input: z.infer<typeof DeleteAccountSchemaForm>): Promise<ActionResponse<boolean>> {
  const { data: response, status, message } = await withActionSessionAndSchema(DeleteAccountSchemaForm, input)

  if (response == null) return { data: response, status, message }
  const { session, data } = response

  try {
    const isMatch = await verifyPassword({ password: data.password })

    if (!isMatch) return { data: false, status: BAD_REQUEST_CODE }

    await Promise.allSettled([
      deleteAllThoughts(),
      deleteAllTemplates(),
      cloudinary.v2.uploader.destroy(`avatars/${session?.user?.id}`, {
        invalidate: true,
      }),
    ])

    await prisma.user.delete({
      where: {
        id: session.user.id,
      },
    })

    return { data: true, status: OK_CODE }
  } catch (e) {
    return { data: false, status: BAD_REQUEST_CODE }
  }
}
