'use server'

import { auth } from '@/lib/auth'
import type { z } from 'zod'

import { type FeedbackSchema, validateFeedback } from '@/schemas/feedback'
import { FeedbackEmail, sendEmail } from '@mindfulyze/emails'

export async function sendFeedback(data: z.infer<typeof FeedbackSchema>) {
  const session = await auth()

  if (!session?.user || !session?.user.email) {
    return { message: 'You must be logged in.', status: 401 }
  }

  const result = validateFeedback(data)

  if (!result.success) {
    return { message: result.error.message, status: 422 }
  }

  try {
    const response = await sendEmail({
      subject: '🎉 New Feedback Received!',
      react: FeedbackEmail({
        email: session.user.email,
        feedback: data.feedback,
      }),
      email: 'bjohansebas@gmail.com',
    })

    return { status: 201, response }
  } catch (e) {
    return { message: "Your feedback couldn't be sent.", status: 400 }
  }
}
