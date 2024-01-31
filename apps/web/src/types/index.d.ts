export interface ActionResponse<T> {
  status: number
  data: T
  message?: string
}
