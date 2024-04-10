import z from 'zod'

export const FeedbackSchema = z.object({
  feedback: z.string().min(1),
})
