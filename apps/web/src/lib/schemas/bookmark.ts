import { z } from 'zod'

export const CreateBookmarkSchema = z.object({
  name: z
    .string()
    .min(1, 'The name must contain at least 1 character')
    .max(30, 'The name must be 30 characters or fewer.'),
})

export const AddThoughtToBookmarkSchema = z.object({
  thoughtId: z.string().min(1),
  bookmarkId: z.string().min(1),
})
