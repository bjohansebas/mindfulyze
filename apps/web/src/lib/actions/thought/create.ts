'use server'

import { prisma } from '@mindfulyze/database'
import {
  BAD_REQUEST_CODE,
  CREATED_CODE,
  NEXTAUTH_SECRET,
  SUPABASE_BUCKET_THOUGHTS,
  UNAUTHORIZED_CODE,
  generateCUID,
} from '@mindfulyze/utils'

import { revalidatePath } from 'next/cache'
import type { z } from 'zod'

import { getTemplateById, getTemplateDefault } from '@/app/actions/templates'
import { withActionSessionAndSchema } from '@lib/auth/utils'
import { decryptData, encryptData } from '@lib/encryption'
import { createFile } from '@lib/supabase'
import { CreateThoughtSchema } from '@schemas/thought'

export async function createThought(input: z.infer<typeof CreateThoughtSchema>) {
  const { data: response, status, message } = await withActionSessionAndSchema(CreateThoughtSchema, input)

  if (response == null) return { data: response, status, message }
  const {
    session,
    data: { template },
  } = response
  if (session.user.pw == null) {
    return { message: 'You must be logged in.', status: UNAUTHORIZED_CODE, data: null }
  }

  let textForThought = ''

  if (template == null) {
    const template = await getTemplateDefault()

    if (template != null) {
      textForThought = template.data?.text || ''
    }
  } else {
    const getTemplate = await getTemplateById(template)

    if (getTemplate != null) {
      textForThought = getTemplate.data?.text || ''
    }
  }

  try {
    const password = decryptData({ key: NEXTAUTH_SECRET, data: session.user.pw })
    const textEncrypt = encryptData({ key: password, data: textForThought })

    const uid = generateCUID()
    const file = await createFile({ name: `${uid}.html`, text: textEncrypt, bucket: SUPABASE_BUCKET_THOUGHTS })

    if (!file.data?.path) {
      return { message: "The thought couldn't be created, try again anew.", status: BAD_REQUEST_CODE, data: null }
    }

    const response = await prisma.thought.create({
      data: {
        id: uid,
        url: file.data?.path,
        bucket: SUPABASE_BUCKET_THOUGHTS,
        userId: session.user.id,
      },
    })

    revalidatePath('/home')

    return { data: response, status: CREATED_CODE }
  } catch (e) {
    return { message: "The thought couldn't be created, try again anew.", status: BAD_REQUEST_CODE, data: null }
  }
}
