import { isAxiosError } from 'axios'
import { BadRequestError, ConflictError, NotFoundError, ServerError, UnauthorizedAccessError } from './typeErrors'

export const managerErrorNetwork = (err: unknown): Error => {
  if (isAxiosError(err)) {
    if (err.response?.status === 400) {
      throw new BadRequestError('Bad request')
    } else if (err.response?.status === 401) {
      throw new UnauthorizedAccessError('Unauthorized access')
    } else if (err.response?.status === 404) {
      throw new NotFoundError('Route not found')
    } else if (err.response?.status === 409) {
      throw new ConflictError('Conflict')
    } else {
      throw new ServerError('Server not working')
    }
  }

  throw err
}
