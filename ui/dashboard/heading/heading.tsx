'use client'

import { useState } from 'react'
import { DialogThought } from '../editor/dialog-thoughts'
import { DialogTemaplate } from '../templates/dialog-template'
import { MenuTemaplate } from '../templates/menu-template'
import { TemplateResponse } from '@/app/actions/templates'

export function HeadDashboard({ templates }: { templates: Promise<TemplateResponse> }) {
  const [isOpenThoughts, setIsOpenThoughts] = useState(false)
  const [isOpenTemplates, setIsOpenTemplates] = useState(false)

  return (
    <div className="bg-white sm:w-2/4 w-screen flex p-4 rounded-lg shadow justify-end border bor">
      <DialogThought isOpen={isOpenThoughts} setIsOpen={setIsOpenThoughts} />
      <MenuTemaplate setIsOpen={setIsOpenTemplates} templates={templates} />
      <DialogTemaplate isOpen={isOpenTemplates} setIsOpen={setIsOpenTemplates} />
    </div>
  )
}
