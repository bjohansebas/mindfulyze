export interface Thought {
  id: string
  text: string
  createdAt: Date
  updatedAt: Date
  userId: string
}

export enum Feedback {
  Positive = 'positive',
  Negative = 'negative',
  Neutral = 'neutral',
}
