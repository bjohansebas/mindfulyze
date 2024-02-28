import { CONFIRM_MESSAGE } from '@mindfulyze/utils'
import z from 'zod'

export const NameFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(32, {
      message: 'Name must not be longer than 32 characters.',
    }),
})

export function validateName(input: z.infer<typeof NameFormSchema>) {
  return NameFormSchema.safeParse(input)
}

export const EmailFormSchema = z.object({
  email: z.string().email(),
})

export function validateEmail(input: z.infer<typeof EmailFormSchema>) {
  return EmailFormSchema.safeParse(input)
}

export const AvatarFormSchema = z.object({
  avatar: z.string().email(),
})

export function validateAvatar(input: z.infer<typeof AvatarFormSchema>) {
  return AvatarFormSchema.safeParse(input)
}

export const DeleteAccountSchemaForm = z
  .object({
    password: z.string(),
    confirm_text: z.string(),
  })
  .refine((data) => data.confirm_text === CONFIRM_MESSAGE, {
    message: `The text you entered did not match "${CONFIRM_MESSAGE}".`,
    path: ['confirm_text'],
  })

export function validateDeleteAccount(input: z.infer<typeof DeleteAccountSchemaForm>) {
  return DeleteAccountSchemaForm.safeParse(input)
}
