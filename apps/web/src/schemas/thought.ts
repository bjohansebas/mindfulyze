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

export const ThoughtSchema = z.object({
  textWithFormat: z.string(),
  created: z.date().default(new Date()),
})

export function validatePartialThought(input: z.infer<typeof ThoughtSchema>) {
  return ThoughtSchema.partial().safeParse(input)
}
