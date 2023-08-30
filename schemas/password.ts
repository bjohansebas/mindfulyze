import z from 'zod'

export const NewPasswordSchema = z
  .object({
    password: z.string().min(8).max(30),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

export function validateNewPassword(input: z.infer<typeof NewPasswordSchema>) {
  return NewPasswordSchema.safeParse(input)
}
