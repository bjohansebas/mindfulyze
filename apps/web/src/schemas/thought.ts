import z from 'zod'

export const ThoughtSchema = z.object({
  textWithFormat: z.string(),
  created: z.date().default(new Date()),
})

export function validateThought(input: z.infer<typeof ThoughtSchema>) {
  return ThoughtSchema.safeParse(input)
}

export function validatePartialThought(input: z.infer<typeof ThoughtSchema>) {
  return ThoughtSchema.partial().safeParse(input)
}
