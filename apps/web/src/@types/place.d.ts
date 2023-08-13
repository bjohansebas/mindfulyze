import { Color } from './color'

export interface Place {
  id: string
  name: string
  color?: Color
}

export type AllPlaces = Place[]
