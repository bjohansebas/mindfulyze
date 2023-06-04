import { Helmet } from 'react-helmet-async'

import { ArchiveUI } from 'components/Archive'

export function ArchivePage (): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Archive | Mindfulyze</title>
      </Helmet>
      <ArchiveUI />
    </>
  )
}
