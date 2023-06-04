import { ShowPlaceUI } from '@/components/Place/ShowPlace'
import { Helmet } from 'react-helmet-async'

export function ShowPlacePage (): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Place | Mindfulyze</title>
      </Helmet>
      <ShowPlaceUI />
    </>
  )
}
