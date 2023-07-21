import { Helmet } from 'react-helmet-async'

import { ShowTrashUI } from 'components/Trash/ShowTrash'

export function ShowTrashPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Trash | Mindfulyze</title>
      </Helmet>
      <ShowTrashUI />
    </>
  )
}
