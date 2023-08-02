import { AllEmotions } from './emotion'
import { Place } from './place'
import { Account } from './user'

export interface Think {
  id: string
  text: string
  place: Place[]
  user?: Account
  emotions?: AllEmotions
  createdAt: string
  updatedAt: string
}

export interface NewThink {
  text: string
  place?: string[]
  emotion?: string[]
}

export interface UpdateThink {
  text?: string
  place?: string[]
  emotion?: string[]
}

export interface UpdateEmotionThink {
  add: string[]
  remove: string[]
}

export type Thinks = Think[]
