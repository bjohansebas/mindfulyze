import { Box } from '@mui/material'
import { Helmet } from 'react-helmet-async'

import { DashboardUI } from '@/components/Dashboard'

export function DashboardPage (): JSX.Element {
  return (
    <Box
      component="main"
      sx={{ width: '100%', px: { xs: '10px', sm: '50px', md: '100px' }, py: '20px' }}>
      <Helmet>
        <title>Dashboard | Alignmind</title>
      </Helmet>
      <DashboardUI/>
    </Box>
  )
}
