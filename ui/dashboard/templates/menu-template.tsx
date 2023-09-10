'use client'
import { Button } from '@/ui/button'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { Template } from '@/@types/template'
import { getTemplates } from '@/app/actions/templates'
import { toast } from 'sonner'

interface DialogTemplateProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function MenuTemplate({ setIsOpen }: DialogTemplateProps) {
  const [templates, setTemplates] = useState<Template[]>([])

  const getThoughtsUser = async () => {
    const response = await getTemplates()
    if (response.status === 200) {
      setTemplates(response.data)
    } else {
      toast.error(response.message)
    }

  }

  useEffect(() => {
    getThoughtsUser()
  }, [])

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
          {templates.length > 0 ? (
            templates.map((data) => (
              <DropdownMenuItem className="flex justify-between">
                <span>{data.title}</span>
              </DropdownMenuItem>
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
