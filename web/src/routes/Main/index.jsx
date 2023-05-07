import { Box } from '@mui/material'

import { Outlet } from 'react-router-dom'

function MainPage () {
  return (
    <Box display='flex' sx={{ minHeight: '100vh' }}>
      <Outlet />
    </Box>
  )
}

export { MainPage }
