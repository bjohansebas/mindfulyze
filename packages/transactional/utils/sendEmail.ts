import { generateId } from './generateId'

import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async ({
  subject,
  react,
  email,
}: {
  subject: string
  email?: string
  react: JSX.Element
}) => {
  if (!resend) {
    console.log('Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work.')
    return Promise.resolve()
  }

  return resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email ?? 'delivered@resend.dev',
    subject,
    react,
    headers: {
      'X-Entity-Ref-ID': generateId(),
    },
  })
}
