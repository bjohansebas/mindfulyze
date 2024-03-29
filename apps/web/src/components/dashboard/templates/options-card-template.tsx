'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@mindfulyze/ui'
import { Button, toast } from '@mindfulyze/ui'

import { FilesIcon, FlagIcon, MoreHorizontalIcon, SquarePenIcon, TrashIcon } from 'lucide-react'

import { deleteTemplate, duplicateTemplate, setDefaultTemplate } from '@/app/actions/templates'

import Link from 'next/link'

interface OptionCardTemplate {
  id: string
}

export function OptionsCardTemplate({ id }: OptionCardTemplate) {
  const handleDeleteTemplate = async () => {
    toast.message('The template is being deleted.')

    const response = await deleteTemplate(id, 'templates')

    if (response.status === 201 && response.data) {
      toast.success('The template has been deleted.')
    } else {
      toast.error(response.message)
    }
  }

  const handleDuplicateTemplate = async () => {
    toast.message('The template is being duplicated.')

    const response = await duplicateTemplate(id)

    if (response.status === 201 && response.data) {
      toast.success('The template has been duplicated.')
    } else {
      toast.error(response.message)
    }
  }

  const handleSetDefaultTemplate = async () => {
    toast.message('The default template is being changed.')

    const response = await setDefaultTemplate(id, 'templates')

    if (response.status === 201 && response.data) {
      toast.success('The default template has been changed.')
    } else {
      toast.error(response.message)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="z-auto">
        <Button shape="circle" variant="ghost" className="z-auto">
          <MoreHorizontalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-[230px]">
          <DropdownMenuItem asChild>
            <Link className="w-full" href={`/templates/${id}`}>
              <SquarePenIcon className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSetDefaultTemplate}>
            <FlagIcon className="mr-2 h-4 w-4" />
            Set as default
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDuplicateTemplate}>
            <FilesIcon className="mr-2 h-4 w-4" />
            Duplicate
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDeleteTemplate}>
            <TrashIcon className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}
