export interface Thought {
  id: string
  text: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export enum Feedback {
  positive = 'positive',
  negative = 'negative',
  neutral = 'neutral',
}
