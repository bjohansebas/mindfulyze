import { Box } from '@mui/material'

import { Outlet } from 'react-router-dom'

function MainPage () {
  return (
    <Box display='flex' sx={{ backgroundColor: '#f6f6f6', minHeight: '100vh' }}>
      <Outlet />
    </Box>
  )
}

export { MainPage }
