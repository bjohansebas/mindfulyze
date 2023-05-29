import { ShowPlaces } from './Place/ShowPlace'
import { WelcomeHeader } from './Header'
import { ShowStatistics } from './Statistics/ShowStatistics'

export function DashboardUI (): JSX.Element {
  return (
    <>
      <WelcomeHeader />
      <ShowPlaces />
      <ShowStatistics />
    </>
  )
}
