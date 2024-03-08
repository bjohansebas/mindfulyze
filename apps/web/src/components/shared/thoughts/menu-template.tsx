'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDownIcon } from 'lucide-react'

import { createTemplate } from '@/app/actions/templates'
import { createThought } from '@/app/actions/thoughts'
import type { Template } from '@/types/template'

import { Button, toast } from '@mindfulyze/ui'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export function MenuTemplate({ templates }: { templates: Template[] }) {
  const router = useRouter()
  const pathname = usePathname()

  const [openMenu, setOpenMenu] = useState(false)

  const handleOpenThought = async (id: string) => {
    setOpenMenu(false)

    toast.message('The thought is being created.')

    const response = await createThought(id)
    if (response.status === 201 && response.data != null) {
      router.push('/home')
      toast.success('Thought was created.')
    } else {
      toast.error("The thought couldn't be created, try again anew.")
    }
  }

  return (
    <DropdownMenu open={openMenu} onOpenChange={setOpenMenu}>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-l-none p-1">
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel>Templates for thoughts</DropdownMenuLabel>
        <DropdownMenuGroup>
          {templates.length > 0 ? (
            templates.map((data) => (
              <DropdownMenuItem
                className="flex w-full items-center justify-between"
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
            <div className="flex flex-col items-center gap-5 p-5">
              <p className="text-center">Oops, it looks like you don&apos;t have any templates.</p>
              <DropdownMenuItem
                onClick={async () => {
                  toast.message('The template is being created.')

                  const template = await createTemplate({ textWithFormat: '', title: 'Untitle' }, pathname)
                  if (template.status === 201 && template.data != null) {
                    router.push(`/templates/${template.data.id}`)
                  }
                }}
                className="text-emerald-700"
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
