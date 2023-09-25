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

import { useState } from 'react'
import { handleCreateThought } from '../thoughts/create-thoughts'

export function MenuTemplate() {
  const { templates, loadingTemplate, setNewTemplate } = useApp()
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
      <DropdownMenuTrigger>
        <Button className="p-1 rounded-l-none">
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel>Templates for thoughts</DropdownMenuLabel>
        <DropdownMenuGroup>
          {loadingTemplate ? (
            <Skeleton className="h-4 w-full" />
          ) : templates.length > 0 ? (
            templates.map((data) => (
              <DropdownMenuItem
                className="flex items-center w-full justify-between"
                key={data.id}
                onClick={() => {
                  return handleOpenThought(data.id)
                }}
              >
                <span>{data.title}</span>
                <div>{data.default ? <span className="text-sm">DEFAULT</span> : null}</div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-5 flex items-center flex-col gap-5">
              <p className="text-center">Oops, it looks like you don$apos;t have any templates.</p>
              <DropdownMenuItem onClick={() => {}} className="text-primary-700">
                Create your first template.
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setNewTemplate(true)
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
