import { z } from 'zod'

export const CreateBookmarkSchema = z.object({
  name: z.string().min(1),
})

export const AddThoughtToBookmarkSchema = z.object({
  thoughtId: z.string().min(1),
  bookmarkId: z.string().min(1),
})
