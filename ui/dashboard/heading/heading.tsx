'use client'

import { Button } from '@/ui/button'
import { ChevronDownIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { DialogThought } from '../editor/dialog-thoughts'
import { DialogTemplate } from '../templates/dialog-template'

const MenuTemplate = dynamic(() => import('../templates/menu-template'), {
  loading: () => (
    <Button className="p-1 rounded-l-none" disabled>
      <ChevronDownIcon className="h-4 w-4" />
    </Button>
  ),
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
