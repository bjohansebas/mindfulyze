import type { BookmarkThoughts } from '@mindfulyze/database'

export interface Thought {
  bookmarks?: BookmarkThoughts[]
  id: string
  text: string
  createdAt: Date
  updatedAt: Date
  userId: string
}
