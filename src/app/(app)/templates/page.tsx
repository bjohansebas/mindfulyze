import { getTemplates } from '@/app/actions/templates'
import { HeaderTemplate } from '@/components/dashboard/templates/header'
import { ListOfTemplates } from '@/components/dashboard/templates/list-of-templates'
import TemplatesPlaceholder from '@/components/dashboard/templates/placeholder-templates'

import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <div className="w-full flex flex-col gap-4 p-6 h-screen">
      <HeaderTemplate />
      <Suspense fallback={<TemplatesPlaceholder />}>
        <ListOfTemplates templates={getTemplates()} />
      </Suspense>
    </div>
  )
}