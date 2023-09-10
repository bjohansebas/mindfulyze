'use client'

import { Dispatch, SetStateAction } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { DocumentDuplicateIcon, FlagIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { deleteTemplate, duplicateTemplate, setDefaultTemplate } from '@/app/actions/templates'
import { toast } from 'sonner'
import { useApp } from '@/lib/hooks/useApp'

interface DialogTemplateProps {
  id: string,
  children: JSX.Element,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function OptionsMenuTemplate({ id, children, setIsOpen }: DialogTemplateProps) {
  const { setTemplates } = useApp()

  const handleOpenTemplate = () => setIsOpen((prev) => !prev)

  const handleDeleteTemplate = async () => {
    const response = await deleteTemplate(id)

    if (response.status === 201 && response.data) {
      setTemplates((prev) => prev.filter((value) => value.id !== id))

      toast.success("The template has been deleted.")
    } else {
      toast.error(response.message)
    }
  }

  const handleDuplicateTemplate = async () => {
    const response = await duplicateTemplate(id)

    if (response.status === 201 && response.data) {
      setTemplates((prev) => prev.concat([response.data]))

      toast.success("The template has been duplicated.")
    } else {
      toast.error(response.message)
    }
  }

  const handleSetDefaultTemplate = async () => {
    const response = await setDefaultTemplate(id)

    if (response.status === 201 && response.data) {
      setTemplates((prev) => {
        const templates = [...prev]

        const deleteDefault = templates.find((value) => value.default === true)
        if (deleteDefault != null) deleteDefault.default = false

        const addDefault = templates.find((value) => value.id === id)
        if (addDefault != null) addDefault.default = true

        return templates
      })

      toast.success("The default template has been changed.")
    } else {
      toast.error(response.message)
    }
  }

  return (
    <DropdownMenuSub>

      <DropdownMenuSubTrigger>{children}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-[230px]">
          <DropdownMenuItem onClick={handleOpenTemplate} >
            <PencilSquareIcon className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSetDefaultTemplate} >
            <FlagIcon className="mr-2 h-4 w-4" />
            Set as default
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicateTemplate} >
            <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteTemplate} >
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
