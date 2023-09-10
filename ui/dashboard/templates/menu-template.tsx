'use client'
import { Button } from '@/ui/button'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ChevronDownIcon, EllipsisHorizontalIcon, PlusIcon } from '@heroicons/react/24/solid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { useApp } from '@/lib/hooks/useApp'
import { OptionsMenuTemplate } from './options-menu-template'
import { Skeleton } from '@/ui/skeleton'

interface DialogTemplateProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function MenuTemplate({ setIsOpen }: DialogTemplateProps) {
  const { templates, loadingTemplate } = useApp()

  const handleOpenTemplate = () => setIsOpen((prev) => !prev)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="p-1 rounded-l-none">
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px]">
        <DropdownMenuLabel>Templates for thoughts</DropdownMenuLabel>
        <DropdownMenuGroup>
          {loadingTemplate ? <Skeleton></Skeleton> : templates.length > 0 ? (
            templates.map((data) => (
              <OptionsMenuTemplate id={data.id} setIsOpen={handleOpenTemplate} key={data.id}>
                <div className='flex items-center w-full justify-between'>
                  <span>{data.title}</span>
                  <div>
                    {data.default ? <span className='text-sm'>DEFAULT</span> : null}
                  </div>
                </div>
              </OptionsMenuTemplate>
            ))
          ) : (
            <div className="p-5 flex items-center flex-col gap-5">
              <p className="text-center">Oops, it looks like you don't have any templates.</p>
              <DropdownMenuItem onClick={handleOpenTemplate} className="text-primary-700">
                Create your first template.
              </DropdownMenuItem>
            </div>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOpenTemplate} className="text-primary-700">
          <PlusIcon className="mr-2 h-4 w-4" />
          New template
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default MenuTemplate