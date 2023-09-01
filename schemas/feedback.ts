import z from 'zod'

export const FeedbackSchema = z.object({
  feedback: z.string().min(1),
})

export function validateFeedback(input: z.infer<typeof FeedbackSchema>) {
  return FeedbackSchema.safeParse(input)
}
