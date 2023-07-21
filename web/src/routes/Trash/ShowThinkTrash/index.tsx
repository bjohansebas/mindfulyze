import { Helmet } from 'react-helmet-async'

import { ShowThinkTrashUI } from 'components/Trash/ShowThinkTrash'

export function ShowThinkTrashPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Think trash | Mindfulyze</title>
      </Helmet>
      <ShowThinkTrashUI />
    </>
  )
}
