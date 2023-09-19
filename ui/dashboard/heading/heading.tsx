'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { DialogThought } from '../editor/dialog-thoughts'
import { DialogTemplate } from '../templates/dialog-template'

const MenuTemplate = dynamic(() => import('../templates/menu-template'), {
  // ssr: false
})

export function HeadDashboard() {
  const [isOpenThoughts, setIsOpenThoughts] = useState(false)
  const [isOpenTemplates, setIsOpenTemplates] = useState(false)

  return (
    <div className="bg-white sm:w-2/4 w-screen flex p-4 rounded-lg shadow justify-end border bor">
      <DialogThought isOpen={isOpenThoughts} setIsOpen={setIsOpenThoughts} />
      <MenuTemplate setIsOpen={setIsOpenTemplates} setIsOpenThought={setIsOpenThoughts} />
      <DialogTemplate isOpen={isOpenTemplates} setIsOpen={setIsOpenTemplates} />
    </div>
  )
}
