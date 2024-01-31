import { createThought } from '@/app/actions/thoughts'

import { getTemplates } from '@/app/actions/templates'
import { PencilIcon } from '@heroicons/react/24/solid'
import { Button } from '@mindfulyze/ui'
import { redirect } from 'next/navigation'
import { CreateButton } from './create-button'
import MenuTemplate from './menu-template'

export async function CreateThought() {
  const templates = await getTemplates()

  return (
    <div className="flex">
      <CreateButton templates={templates.data} />
      <MenuTemplate templates={templates.data} />
    </div>
  )
}
