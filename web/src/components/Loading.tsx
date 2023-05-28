import { Box, CircularProgress } from '@mui/material'
import { Banner } from './Banner'

function Loading (): JSX.Element {
  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      position: 'relative',
      background: 'linear-gradient(45deg, #00575C 0%, #002d32 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
    }}>
      <CircularProgress sx={{ color: '#EBF3F0' }}/>
      <Box sx={{ position: 'absolute', bottom: '100px' }}>
        <Banner color="#EBF3F0" />
      </Box>
    </Box>
  )
}

export { Loading }
