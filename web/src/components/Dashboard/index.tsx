import { ShowPlaces } from './Place/ShowPlace'
import { UserWelcomeHeader } from './Header'
import { ShowStatistics } from './Statistics/ShowStatistics'
import { Stack } from '@mui/material'

export function DashboardUI (): JSX.Element {
  return (
    <Stack spacing={2} px="4px">
      <UserWelcomeHeader />
      <ShowPlaces />
      <ShowStatistics />
    </Stack>
  )
}
