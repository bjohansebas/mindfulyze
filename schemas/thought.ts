import z from 'zod'

export const thoughtSchema = z.object({
  text: z
    .string({
      invalid_type_error: 'Thought text must be a string',
      required_error: 'Thought text is required.',
    })
    .max(4000)
    .min(10),
})

export function validateThought(input: z.infer<typeof thoughtSchema>) {
  return thoughtSchema.safeParse(input)
}

export function validatePartialThought(input: z.infer<typeof thoughtSchema>) {
  return thoughtSchema.partial().safeParse(input)
}
