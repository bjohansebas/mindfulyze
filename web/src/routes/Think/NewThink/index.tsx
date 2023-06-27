import { Helmet } from 'react-helmet-async'

import { NewThinkUI } from 'components/Think/NewThink'

export function NewThinkPage (): JSX.Element {
  return (
    <>
      <Helmet>
        <title>New think | Mindfulyze</title>
      </Helmet>
      <NewThinkUI/>
    </>
  )
}
