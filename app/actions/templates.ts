'use server'

import { Template } from '@/@types/template'
import { getTemplatesByUser } from '@/lib/api/utils'
import { authOptions } from '@/lib/auth'
import { SUPABASE_BUCKET_TEMPLATES } from '@/lib/constants/supabase'
import prisma from '@/lib/prisma'
import { createFile, deleteFile, downloadFile } from '@/lib/supabase'
import { createId } from '@/lib/utils'
import { TemplateSchema, validateTemplate } from '@/schemas/template'
import { getServerSession } from 'next-auth'

import * as z from 'zod'

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

// Get template of user
export async function getTemplateById(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user.id || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: null }
  }

  try {
    const { url, bucket, ...res } = await prisma.template.findUniqueOrThrow({
      where: {
        id: id,
        userId: session.user.id
      }
    })

    const dataTemplate = await downloadFile({ name: url, bucket })

    if (dataTemplate.data == null) {
      return {
        message: "The template was not found.", data: null, status: 404
      }
    }

    const text = await dataTemplate.data.text()

    return { data: { text, ...res, url, bucket }, status: 200 }
  } catch (e) {
    return { message: 'Not found template', status: 404, data: null }
  }
}


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

  // if (templatesUser.data.length >= 1) {
  //   return { message: 'You cannot create new templates until you improve your plan.', status: 400, data: null }
  // }

  try {
    const uid = createId()
    const file = await createFile({
      name: `${uid}.html`,
      text: data.text.withFormat,
      bucket: SUPABASE_BUCKET_TEMPLATES,
    })

    if (!file.data?.path) {
      return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
    }

    const { url, bucket, ...res } = await prisma.template.create({
      data: {
        id: uid,
        url: file.data?.path,
        title: data.title,
        bucket: SUPABASE_BUCKET_TEMPLATES,
        userId: session.user.id,
        default: templatesUser.data.length === 0
      },
    })

    return { data: { text: data.text.withFormat, ...res }, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
  }
}

// Create new template for user
export async function duplicateTemplate(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: null }
  }

  try {
    const template = await getTemplateById(id)

    if (!(template.status === 200 && template.data != null)) {
      return { data: null, status: 400 }
    }

    const response = await createTemplate({
      text: {
        withFormat: template.data.text,
        withoutFormat: template.data.text
      },
      title: `${template.data.title} Copied`
    })

    if (response.status === 201 && response.data) {
      return { data: response.data, status: 201 }
    } else {
      return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
    }
  } catch (e) {
    return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
  }
}

export async function setDefaultTemplate(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }


  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: false }
  }

  const templatesUser = await getTemplates()

  if (templatesUser.data.length === 0) {
    return { message: 'You don\'t have any templates to convert into defaults.', status: 400, data: false }
  }

  try {
    const template = templatesUser.data.find((data) => data.id === id);

    if (template == null) {
      return { message: 'The template was not found.', status: 400, data: false }
    }

    const getTemplateDefault = templatesUser.data.find((data) => data.default === true);

    if (getTemplateDefault != null) {
      await prisma.template.update({
        data: {
          default: false
        },
        where: {
          id: getTemplateDefault.id
        }
      })
    }

    await prisma.template.update({
      data: {
        default: true
      },
      where: {
        id: template.id
      }
    })


    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be set as default, please try again.", status: 400, data: false }
  }
}


export async function deleteTemplate(id: string) {
  const session = await getServerSession(authOptions)

  if (!session?.user || !session.user.pw) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }


  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: false }
  }

  try {
    const template = await getTemplateById(id)

    if (template.data == null) {
      return { message: 'The template was not found.', status: 400, data: false }
    }

    const deleteStorage = await deleteFile({ name: template.data.url, bucket: template.data.bucket })

    if (deleteStorage.error) {
      return { message: "The template couldn't be deleted, please try again.", status: 400, data: false }
    }

    await prisma.template.delete({
      where: {
        id: template.data.id
      }
    })

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be set as default, please try again.", status: 400, data: false }
  }
}
