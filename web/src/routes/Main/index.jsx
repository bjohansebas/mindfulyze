import { Box } from '@mui/material'

import { Outlet } from 'react-router-dom'

import { MenuApp } from './MenuNav'

function MainPage () {
  return (
    <Box>
      <MenuApp />
      <Outlet />
    </Box>
  )
}

export { MainPage }
