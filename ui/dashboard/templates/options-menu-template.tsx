'use client'

import { DocumentDuplicateIcon, FlagIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'

import {
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/ui/dropdown-menu'
import { deleteTemplate, duplicateTemplate, setDefaultTemplate } from '@/app/actions/templates'
import { useApp } from '@/lib/hooks/useApp'

import { toast } from 'sonner'
import { Dispatch, SetStateAction } from 'react'

interface DialogTemplateProps {
  id: string
  children: JSX.Element
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onClick: () => void
}

export function OptionsMenuTemplate({ id, children, setIsOpen, onClick }: DialogTemplateProps) {
  const { setTemplates, setNewTemplate } = useApp()

  const handleOpenTemplate = () => {
    setTemplates((prev) => {
      const templates = [...prev]

      const templateSelect = templates.find((value) => value.isSelect)

      if (templateSelect != null) {
        templateSelect.isSelect = false
      }

      const newSelect = templates.find((value) => value.id === id)

      if (newSelect != null) {
        newSelect.isSelect = true
      }

      return templates
    })

    setNewTemplate(false)

    setIsOpen((prev) => !prev)
  }

  const handleDeleteTemplate = async () => {
    const response = await deleteTemplate(id)

    if (response.status === 201 && response.data) {
      setTemplates((prev) => prev.filter((value) => value.id !== id))

      toast.success('The template has been deleted.')
    } else {
      toast.error(response.message)
    }
  }

  const handleDuplicateTemplate = async () => {
    const response = await duplicateTemplate(id)

    if (response.status === 201 && response.data) {
      setTemplates((prev) => prev.concat([{ isSelect: false, ...response.data }]))

      toast.success('The template has been duplicated.')
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

        if (deleteDefault != null) {
          deleteDefault.default = false
          deleteDefault.isSelect = false
        }

        const addDefault = templates.find((value) => value.id === id)

        if (addDefault != null) {
          addDefault.default = true
          addDefault.isSelect = true
        }

        return templates
      })

      toast.success('The default template has been changed.')
    } else {
      toast.error(response.message)
    }
  }

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger onClick={onClick}>{children}</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="w-[230px]">
          <DropdownMenuItem onClick={handleOpenTemplate}>
            <PencilSquareIcon className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSetDefaultTemplate}>
            <FlagIcon className="mr-2 h-4 w-4" />
            Set as default
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicateTemplate}>
            <DocumentDuplicateIcon className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteTemplate}>
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}
