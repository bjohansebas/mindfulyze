'use client'

import { useState } from 'react'
import { DialogThought } from '../editor/dialog-thoughts'
import { DialogTemaplate } from '../templates/dialog-template'
import { MenuTemplate } from '../templates/menu-template'

export function HeadDashboard() {
  const [isOpenThoughts, setIsOpenThoughts] = useState(false)
  const [isOpenTemplates, setIsOpenTemplates] = useState(false)

  return (
    <div className="bg-white sm:w-2/4 w-screen flex p-4 rounded-lg shadow justify-end border bor">
      <DialogThought isOpen={isOpenThoughts} setIsOpen={setIsOpenThoughts} />
      <MenuTemplate setIsOpen={setIsOpenTemplates} />
      <DialogTemaplate isOpen={isOpenTemplates} setIsOpen={setIsOpenTemplates} />
    </div>
  )
}
