import z from 'zod'

export const ThoughtSchema = z.object({
  text: z.object({
    withFormat: z.string().min(10),
    withoutFormat: z
      .string({
        invalid_type_error: 'Thought text must be a string',
        required_error: 'Thought text is required.',
      })
      .max(5000,"The thought must have a maximum of 5000 characters.")
      .min(20,"The thought should have a minimum of 20 characters.")
      .trim(),
  }),
  created: z.date().default(new Date()),
})

export function validateThought(input: z.infer<typeof ThoughtSchema>) {
  return ThoughtSchema.safeParse(input)
}

export function validatePartialThought(input: z.infer<typeof ThoughtSchema>) {
  return ThoughtSchema.partial().safeParse(input)
}
