import { Box, Typography } from '@mui/material'
import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function ErrorPage (): JSX.Element {
  const error = useRouteError()
  let errorMessage: string

  if (isRouteErrorResponse(error)) {
    errorMessage = ((error.error?.message) != null) ? error.error?.message : error.statusText
  } else if (error instanceof Error) {
    errorMessage = error.message
  } else if (typeof error === 'string') {
    errorMessage = error
  } else {
    errorMessage = 'Unknown error'
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh'
    }}>
      <Typography variant='h1'>Oops!</Typography>
      <Typography paragraph>Sorry, an unexpected error has occurred.</Typography>
      <Typography paragraph fontWeight={600}>{errorMessage}</Typography>
    </Box >
  )
}
