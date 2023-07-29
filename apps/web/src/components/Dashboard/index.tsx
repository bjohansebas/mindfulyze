import { Stack } from '@mui/material'
import { UserWelcomeHeader } from './Header'
import { ShowPlaces } from './Place/ShowPlace'
import { ShowStatistics } from './Statistics/ShowStatistics'

export function DashboardUI(): JSX.Element {
  return (
    <Stack spacing={2} px='4px'>
      <UserWelcomeHeader />
      <ShowPlaces />
      <ShowStatistics />
    </Stack>
  )
}
