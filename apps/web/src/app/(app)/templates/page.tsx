import { HeaderTemplate } from '@/components/dashboard/templates/header'
import { ListOfTemplates } from '@/components/dashboard/templates/list-of-templates'
import TemplatesPlaceholder from '@/components/dashboard/templates/placeholder-templates'

import { Suspense } from 'react'

export default async function Page() {
  return (
    <div className="flex h-screen w-full flex-col gap-4 p-6">
      <HeaderTemplate />
      <Suspense fallback={<TemplatesPlaceholder />}>
        <ListOfTemplates />
      </Suspense>
    </div>
  )
}
