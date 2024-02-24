import { MAX_LENGTH_PW, MIN_LENGTH_PW } from '@mindfulyze/utils'

import z from 'zod'

export const NewPasswordSchema = z
  .object({
    password: z.string().min(MIN_LENGTH_PW).max(MAX_LENGTH_PW),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export const SetPasswordSchema = z.object({
  password: z.string().min(MIN_LENGTH_PW).max(MAX_LENGTH_PW),
})
