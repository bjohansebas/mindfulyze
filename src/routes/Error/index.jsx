import { Box, Typography } from '@mui/material'
import { useRouteError } from 'react-router-dom'

function ErrorPage () {
  const error = useRouteError()

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
      <Typography paragraph fontWeight={600}>{error.statusText || error.message}</Typography>
    </Box >
  )
}

export { ErrorPage }
