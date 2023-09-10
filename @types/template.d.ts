export interface Template {
  id: string
  text: string
  title: string
  default: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
}

export interface TemplateApp extends Template {
  isSelect: boolean
}
