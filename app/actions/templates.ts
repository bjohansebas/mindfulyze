'use server'

import { Template } from '@/@types/template'
import { getTemplatesByUser } from '@/lib/api/utils'
import { authOptions } from '@/lib/auth'
import { SUPABASE_BUCKET_TEMPLATES } from '@/lib/constants/supabase'
import prisma from '@/lib/prisma'
import { createFile, downloadFile } from '@/lib/supabase'
import { createId } from '@/lib/utils'
import { TemplateSchema, validateTemplate } from '@/schemas/template'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'

import * as z from 'zod'

// Create new template for user
export async function createTemplate(data: z.infer<typeof TemplateSchema>) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  const result = validateTemplate(data)

  if (!result.success) {
    return { message: result.error.message, status: 422 }
  }

  const templatesUser = await getTemplates()

  if (templatesUser.data.length>=1) {
    return { message: '"You cannot create new templates until you improve your plan."', status: 400, data: null }
  }

  try {
    const uid = createId()
    const file = await createFile({ name: `${uid}.html`, text: data.text.withFormat, bucket: SUPABASE_BUCKET_TEMPLATES })

    if (!file.data?.path) {
      return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
    }

    const response = await prisma.template.create({
      data: {
        id: uid,
        url: file.data?.path,
        title: data.title,
        bucket: SUPABASE_BUCKET_TEMPLATES,
        userId: session.user.id,
      },
    })

    revalidatePath('/home')

    return { data: response, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
  }
}

export interface TemplateResponse {
  data: Template[]
  message?: string
  status: number
}

// Get template of user
export async function getTemplates(): Promise<TemplateResponse> {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: [] }
  }

  try {
    const response = await getTemplatesByUser({
      userId: session.user.id,
    })

    const template = await Promise.all(
      response.map(async ({ url, bucket, ...res }) => {
        const data = await downloadFile({ name: url, bucket })
        const text = await data.data?.text()

        if (!text) return { text: '', ...res }


        return { text, ...res }
      }),
    )

    return { data: template, status: 200 }
  } catch (e) {
    return { message: 'Not found templates', status: 404, data: [] }
  }
}
