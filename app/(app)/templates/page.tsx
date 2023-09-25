import { getTemplates } from '@/app/actions/templates'
import { Button } from '@/ui/button'
import { ListOfTemplates } from '@/ui/dashboard/templates/list-of-templates'
import ThoughtsPlaceholder from '@/ui/dashboard/thoughts/placeholder-thoughts'

import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <div className="w-full flex flex-col gap-4 p-6 h-screen">
      <nav className="w-full flex justify-between items-center">
        <h1 className="font-bold">Templates</h1>
        <Button>New template</Button>
      </nav>
      <Suspense fallback={<ThoughtsPlaceholder />}>
        <ListOfTemplates templates={getTemplates()} />
      </Suspense>
    </div>
  )
}
