'use client'

import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { ChevronDownIcon } from '@heroicons/react/24/solid'

import { Template } from '@/@types/template'
import { createTemplate } from '@/app/actions/templates'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { handleCreateThought } from '../thoughts/create-thoughts'

export function MenuTemplate({ templates }: { templates: Template[] }) {
  const router = useRouter()
  const pathname = usePathname()

  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenThought = async (id: string) => {
    const findTemplate = templates.find((data) => data.id === id)
    if (findTemplate) {
      await handleCreateThought(findTemplate)
    }

    setOpenMenu(false)
  }

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger asChild>
        <Button className="p-1 rounded-l-none">
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel>Templates for thoughts</DropdownMenuLabel>
        <DropdownMenuGroup>
          {templates.length > 0 ? (
            templates.map((data) => (
              <DropdownMenuItem
                className="flex items-center w-full justify-between"
                key={data.id}
                onClick={() => {
                  return handleOpenThought(data.id)
                }}
              >
                <span>{data.title.trim().length === 0 ? 'Untitle' : data.title}</span>
                <div>{data.default ? <span className="text-sm">DEFAULT</span> : null}</div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-5 flex items-center flex-col gap-5">
              <p className="text-center">Oops, it looks like you don&apos;t have any templates.</p>
              <DropdownMenuItem
                onClick={async () => {
                  toast.message('The template is being created.')

                  const template = await createTemplate({ textWithFormat: '', title: 'Untitle' }, pathname)
                  if (template.status === 201 && template.data != null) {
                    router.push(`/templates/${template.data.id}`)
                  }
                }}
                className="text-primary-700"
              >
                Create your first template
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuTemplate
