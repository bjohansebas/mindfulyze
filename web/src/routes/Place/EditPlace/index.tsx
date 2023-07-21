import { Helmet } from 'react-helmet-async'

import { EditPlaceUI } from 'components/Place/EditPlace'

export function EditPlacePage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Edit place | Mindfulyze</title>
      </Helmet>
      <EditPlaceUI />
    </>
  )
}
