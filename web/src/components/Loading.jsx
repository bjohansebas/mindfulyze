import { Box, CircularProgress, Typography } from '@mui/material'

function Loading () {
  return (
    <Box sx={{
      height: '100vh',
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap: 2
    }}>
      <CircularProgress />
      <Typography paragraph>AlignMind</Typography>
    </Box>
  )
}

export { Loading }
