'use client'

import { useApp } from '@/lib/hooks/useApp'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Skeleton } from '@/ui/skeleton'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid'
import { OptionsMenuTemplate } from './options-menu-template'

import { Dispatch, SetStateAction, useState } from 'react'
import { handleCreateThought } from '../editor/create-thoughts'

interface DialogTemplateProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function MenuTemplate({ setIsOpen }: DialogTemplateProps) {
  const { setTemplates, templates, loadingTemplate, setNewTemplate, templateSelect } = useApp()
  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenTemplate = () => setIsOpen((prev) => !prev)

  const handleOpenThought = async (id: string) => {
    setTemplates((prev) => {
      const templates = [...prev]

      const templateSelect = templates.findIndex((value) => value.isSelect)

      templates[templateSelect].isSelect = false

      const newSelect = templates.findIndex((value) => value.id === id)

      templates[newSelect].isSelect = true
      console.log(templates)
      return templates
    })

    await handleCreateThought(templateSelect)

    setTemplates((prev) => {
      const templates = [...prev]

      const templateSelect = templates.findIndex((value) => value.isSelect)

      if (templateSelect != null) {
        templates[templateSelect].isSelect = false
      }

      const newSelect = templates.findIndex((value) => value.default)

      if (newSelect != null) {
        templates[newSelect].isSelect = true
      }

      return templates
    })

    setOpenMenu(false)
  }

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger>
        <Button className="p-1 rounded-l-none">
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px]">
        <DropdownMenuLabel>Templates for thoughts</DropdownMenuLabel>
        <DropdownMenuGroup>
          {loadingTemplate ? (
            <Skeleton className="h-4 w-full" />
          ) : templates.length > 0 ? (
            templates.map((data) => (
              <OptionsMenuTemplate
                id={data.id}
                setIsOpen={handleOpenTemplate}
                key={data.id}
                onClick={() => {
                  return handleOpenThought(data.id)
                }}
              >
                <div className="flex items-center w-full justify-between">
                  <span>{data.title}</span>
                  <div>{data.default ? <span className="text-sm">DEFAULT</span> : null}</div>
                </div>
              </OptionsMenuTemplate>
            ))
          ) : (
            <div className="p-5 flex items-center flex-col gap-5">
              <p className="text-center">Oops, it looks like you don't have any templates.</p>
              <DropdownMenuItem
                onClick={() => {
                  setNewTemplate(true)
                  handleOpenTemplate()
                }}
                className="text-primary-700"
              >
                Create your first template.
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setNewTemplate(true)
            handleOpenTemplate()
          }}
          className="text-primary-700"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          New template
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuTemplate
