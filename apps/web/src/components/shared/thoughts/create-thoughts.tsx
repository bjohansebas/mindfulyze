import { getTemplates } from '@/app/actions/templates'
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
