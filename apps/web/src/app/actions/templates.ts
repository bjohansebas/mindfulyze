'use server'

import { revalidatePath } from 'next/cache'
import type { z } from 'zod'

import { prisma } from '@mindfulyze/database'
import { SUPABASE_BUCKET_TEMPLATES } from '@mindfulyze/utils'
import { generateCUID } from '@mindfulyze/utils'

import { getTemplatesByDefault, getTemplatesByUser } from '@lib/api/utils'
import { auth } from '@lib/auth'
import { createFile, deleteFile, downloadFile, updateFile } from '@lib/supabase'
import { type TemplateSchema, validatePartialTemplate, validateTemplate } from '@schemas/template'
import type { Template } from 'types/template'

export interface TemplateResponse {
  data: Template[]
  message?: string
  status: number
}

// Get template of user
export async function getTemplates(): Promise<TemplateResponse> {
  const session = await auth()

  if (!session?.user.id) {
    return { message: 'You must be logged in.', status: 401, data: [] }
  }

  try {
    const response = await getTemplatesByUser({
      userId: session.user.id,
    })

    const template = await Promise.all(
      response.map(async ({ url, bucket, ...res }) => {
        const data = await downloadFile({ name: `${url}?bust=${new Date().valueOf()}`, bucket })
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

export async function getTemplateDefault() {
  const session = await auth()

  if (!session?.user.id) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  try {
    const response = await getTemplatesByDefault({
      userId: session.user.id,
    })

    if (response == null) {
      return { message: 'Not found templates', status: 404, data: null }
    }

    const data = await downloadFile({
      name: `${response.url}?bust=${new Date().valueOf()}`,
      bucket: response.bucket,
    })

    const text = await data.data?.text()

    return { data: { text: text || '', ...response }, status: 200 }
  } catch (e) {
    return { message: 'Not found templates', status: 404, data: null }
  }
}

// Get template of user
export async function getTemplateById(id: string) {
  const session = await auth()

  if (!session?.user.id) {
    return { message: 'You must be logged in.', status: 401, data: null }
  }

  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: null }
  }

  try {
    const { url, bucket, ...res } = await prisma.template.findUniqueOrThrow({
      where: {
        id: id,
        userId: session.user.id,
      },
    })

    const dataTemplate = await downloadFile({ name: `${url}?bust=${new Date().valueOf()}`, bucket })

    if (dataTemplate.data == null) {
      return {
        message: 'The template was not found.',
        data: null,
        status: 404,
      }
    }

    const text = await dataTemplate.data.text()

    return { data: { text, ...res, url, bucket }, status: 200 }
  } catch (e) {
    return { message: 'Not found template', status: 404, data: null }
  }
}

// Create new template for user
export async function createTemplate(data: z.infer<typeof TemplateSchema>, page?: string) {
  const session = await auth()

  if (!session?.user.id) {
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
    const uid = generateCUID()
    const file = await createFile({
      name: `${uid}.html`,
      text: data.textWithFormat,
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
        default: templatesUser.data.length === 0,
      },
    })

    if (page) revalidatePath(page)

    return { data: { text: data.textWithFormat, ...res }, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
  }
}

// Create new template for user
export async function updateTemplate(id: string, data: z.infer<typeof TemplateSchema>, page?: string) {
  const session = await auth()

  if (!session?.user.id) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }

  const result = validatePartialTemplate(data)

  if (!result.success) {
    return { message: result.error.message, status: 422, data: false }
  }

  const template = await getTemplateById(id)

  if (template.status !== 200 || template.data == null) {
    return { ...template, data: false }
  }

  try {
    if (data.textWithFormat !== template.data?.text) {
      const file = await updateFile({
        name: `${template.data?.id}.html`,
        text: data.textWithFormat,
        bucket: template.data.bucket,
      })

      if (!file.data?.path) {
        return { message: "The template couldn't be updated, try again anew.", status: 400, data: false }
      }
    }

    if (data.title !== template.data?.title) {
      await prisma.template.update({
        data: {
          title: data.title,
        },
        where: {
          id: template.data.id,
        },
      })
    }

    if (page) revalidatePath(page)

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be updated, try again anew.", status: 400, data: false }
  }
}

// Create new template for user
export async function updateTitleTemplate(id: string, title: string, page?: string) {
  const session = await auth()

  if (!session?.user.id) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }

  const template = await getTemplateById(id)

  if (template.status !== 200 || template.data == null) {
    return { ...template, data: false }
  }

  try {
    if (title !== template.data?.title) {
      await prisma.template.update({
        data: {
          title: title,
        },
        where: {
          id: template.data.id,
        },
      })
    }

    if (page) revalidatePath(page)

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be updated, try again anew.", status: 400, data: false }
  }
}

// Create new template for user
export async function duplicateTemplate(id: string) {
  const session = await auth()

  if (!session?.user.id) {
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

    const response = await createTemplate(
      {
        textWithFormat: template.data.text,
        title: `${template.data.title} Copied`,
      },
      'templates',
    )

    if (response.status === 201 && response.data) {
      return { data: response.data, status: 201 }
    }

    return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
  } catch (e) {
    return { message: "The template couldn't be created, try again anew.", status: 400, data: null }
  }
}

export async function setDefaultTemplate(id: string, page?: string) {
  const session = await auth()

  if (!session?.user) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }

  if (id === '') {
    return { message: 'The ID is empty.', status: 400, data: false }
  }

  const templatesUser = await getTemplates()

  if (templatesUser.data.length === 0) {
    return { message: "You don't have any templates to convert into defaults.", status: 400, data: false }
  }

  try {
    const template = templatesUser.data.find((data) => data.id === id)

    if (template == null) {
      return { message: 'The template was not found.', status: 400, data: false }
    }

    const getTemplateDefault = templatesUser.data.find((data) => data.default === true)

    if (getTemplateDefault != null) {
      await prisma.template.update({
        data: {
          default: false,
        },
        where: {
          id: getTemplateDefault.id,
        },
      })
    }

    await prisma.template.update({
      data: {
        default: true,
      },
      where: {
        id: template.id,
      },
    })

    if (page) revalidatePath(page)

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be set as default, please try again.", status: 400, data: false }
  }
}

export async function deleteTemplate(id: string, page?: string) {
  const session = await auth()

  if (!session?.user.id) {
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
        id: template.data.id,
      },
    })

    if (page) revalidatePath(page)

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The template couldn't be set as default, please try again.", status: 400, data: false }
  }
}

// Create new thought for user
export async function deleteAllTemplates() {
  const session = await auth()

  if (!session?.user.id) {
    return { message: 'You must be logged in.', status: 401, data: false }
  }

  try {
    const templates = await prisma.template.findMany({ where: { userId: session.user.id } })

    if (templates.length === 0) {
      return { message: "The templates couldn't be deleted, try again anew.", status: 400, data: false }
    }

    await Promise.allSettled(
      templates.map(async ({ url, bucket }) => {
        await deleteFile({ name: url, bucket })
      }),
    )

    await prisma.template.deleteMany({
      where: {
        userId: session.user.id,
      },
    })

    return { data: true, status: 201 }
  } catch (e) {
    return { message: "The templates couldn't be deleted, try again anew.", status: 400, data: false }
  }
}
