import { Box } from '@mui/material'

import { Helmet } from 'react-helmet-async'

import { ShowPlaces } from './ShowPlace'
import { Welcome } from './Welcome'
import { Statistics } from './Statistics'

function DashboardPage () {
  return (
    <Box
      component="main"
      sx={{ width: '100%', px: { xs: '10px', sm: '50px', md: '100px' }, py: '20px' }}>
      <Helmet>
        <title>Dashboard | Alignmind</title>
      </Helmet>
      <Welcome />
      <ShowPlaces />
      <Statistics />
    </Box >)
}

export { DashboardPage }
