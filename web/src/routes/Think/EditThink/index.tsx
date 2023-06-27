import { EditThinkUI } from 'components/Think/EditThink'
import { Helmet } from 'react-helmet-async'

export function EditThinkPage (): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Edit think | Mindfulyze</title>
      </Helmet>
      <EditThinkUI />
    </>
  )
}
