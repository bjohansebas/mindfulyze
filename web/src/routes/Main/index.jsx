import { Box } from '@mui/material'

import { Outlet } from 'react-router-dom'

function MainPage () {
  return (
    <Box>
      <Outlet />
    </Box>
  )
}

export { MainPage }
