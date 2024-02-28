export interface ActionResponse<T> {
  status: number
  data: T | null
  message?: string
}
