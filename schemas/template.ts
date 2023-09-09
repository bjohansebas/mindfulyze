import z from 'zod'

export const TemplateSchema = z.object({
  text: z.object({
    withFormat: z.string().min(10),
    withoutFormat: z
      .string({
        invalid_type_error: 'The template text must be a string',
        required_error: 'Template text is required.',
      })
      .max(4000, 'The template should have a maximum of 4000 characters.')
      .min(1)
      .trim(),
  }),
  title: z.string().min(3).max(50),
})

export function validateTemplate(input: z.infer<typeof TemplateSchema>) {
  return TemplateSchema.safeParse(input)
}

export function validatePartialTemplate(input: z.infer<typeof TemplateSchema>) {
  return TemplateSchema.partial().safeParse(input)
}
