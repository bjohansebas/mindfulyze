import { env } from '@/lib/env'
import { createId } from '@/lib/utils'

import { Resend } from 'resend'

export const resend = new Resend(env.RESEND_API_KEY)

export const sendEmail = async ({
  // email,
  subject,
  react,
  // marketing,
  // test,
}: {
  // email: string
  subject: string
  react: JSX.Element
  // marketing?: boolean
  // test?: boolean
}) => {
  if (!resend) {
    console.log('Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.')
    return Promise.resolve()
  }

  return resend.emails.send({
    // from: marketing ? 'Sebastian from Mindfulyze <contact@mindfulyze.com>' : 'Mindfulyze <contact@mindfulyze.com>',
    from: 'onboarding@resend.dev',
    // to: test ? 'delivered@resend.dev' : email,
    to: 'bjohansebas@gmail.com',
    subject,
    react,
    headers: {
      'X-Entity-Ref-ID': createId(),
    },
  })
}
