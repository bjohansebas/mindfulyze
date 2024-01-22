import z from 'zod'

export const TemplateSchema = z.object({
  textWithFormat: z.string(),
  title: z.string().max(50),
})

export function validateTemplate(input: z.infer<typeof TemplateSchema>) {
  return TemplateSchema.safeParse(input)
}

export function validatePartialTemplate(input: z.infer<typeof TemplateSchema>) {
  return TemplateSchema.partial().safeParse(input)
}
