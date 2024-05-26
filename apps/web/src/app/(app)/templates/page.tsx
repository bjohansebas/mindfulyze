import { HeaderTemplate } from '@ui/dashboard/templates/header'
import { ListOfTemplates } from '@ui/dashboard/templates/list-of-templates'
import TemplatesPlaceholder from '@ui/dashboard/templates/placeholder-templates'

import { Suspense } from 'react'

export default async function Page() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-5 px-6 py-6 md:px-0">
      <HeaderTemplate />
      <Suspense fallback={<TemplatesPlaceholder />}>
        <ListOfTemplates />
      </Suspense>
    </div>
  )
}
