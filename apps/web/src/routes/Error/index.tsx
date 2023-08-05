import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function ErrorPage(): JSX.Element {
  const error = useRouteError()
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    errorMessage = error.error?.message != null ? error.error?.message : error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
  }

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className='font-bold'>{errorMessage}</p>
    </div>
  )
}
