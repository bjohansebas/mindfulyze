'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import z from 'zod'

import { FeedbackSchema, validateFeedback } from '@/schemas/feedback'
import { FeedbackEmail, sendEmail } from '@mindfulyze/emails'

export async function sendFeedback(data: z.infer<typeof FeedbackSchema>) {
  const session = await getServerSession(authOptions)

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
    })

    return { status: 201, response }
  } catch (e) {
    return { message: "Your feedback couldn't be sent.", status: 400 }
  }
}
