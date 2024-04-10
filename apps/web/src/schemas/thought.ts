import z from 'zod'

export const GetThoughtByIdSchema = z.object({
  id: z.string().cuid2(),
})

export const GetThoughtsSchema = z.object({
  page: z.number(),
  toDate: z.string().optional(),
  fromDate: z.string().optional(),
})

export const GetThoughtsPagesSchema = z.object({
  toDate: z.string().optional(),
  fromDate: z.string().optional(),
})

export const UpdateTextThoughtSchema = z.object({
  id: z.string(),
  text: z.string(),
})

export const UpdateDateThoughtSchema = z.object({
  id: z.string(),
  created: z.date(),
})
