import { Helmet } from 'react-helmet-async'

import { NewPlaceUI } from 'components/Place/NewPlace'

export function NewPlacePage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>New place | Mindfulyze</title>
      </Helmet>
      <NewPlaceUI />
    </>
  )
}
