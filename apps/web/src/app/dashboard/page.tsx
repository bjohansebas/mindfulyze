import { Box, Stack } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { UserWelcomeHeader } from './Header'
import { ShowStatistics } from './Statistics/ShowStatistics'

export function DashboardPage(): JSX.Element {
  return (
    <Box component='main' sx={{ width: '100%', px: { xs: '10px', sm: '50px', md: '100px' }, py: '20px' }}>
      <Helmet>
        <title>Dashboard | Mindfulyze</title>
      </Helmet>
      <Stack spacing={2} px='4px'>
        <UserWelcomeHeader />
        <ShowStatistics />
      </Stack>
    </Box>
  )
}
