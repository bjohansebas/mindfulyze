import { Button } from '@/ui/button'
import { Dispatch, SetStateAction } from 'react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/solid'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import { TemplateResponse } from '@/app/actions/templates'

interface DialogTemplateProps {
  templates: Promise<TemplateResponse>
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export async function MenuTemaplate({ setIsOpen, templates }: DialogTemplateProps) {
  const templatesData = await templates

  const handleOpenTemplate = () => setIsOpen((prev) => !prev)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className='p-1 rounded-l-none'>
          <ChevronDownIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[360px]">
        <DropdownMenuLabel>Templates for thoughts</DropdownMenuLabel>
        <DropdownMenuGroup>
          {templatesData.data.length > 0 ?
            templatesData.data.map(({ title, default }) =>
              <DropdownMenuItem className='flex justify-between'>
                <span>Title</span>
              </DropdownMenuItem>
            )
            : <div className='p-5 flex items-center flex-col gap-5'>
              <p className='text-center'>
                Oops, it looks like you don't have any templates.
              </p>
              <DropdownMenuItem onClick={handleOpenTemplate} className='text-primary-700'>
                Create your first template.
              </DropdownMenuItem>
            </div>
          }

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleOpenTemplate} className='text-primary-700'>
          <PlusIcon className="mr-2 h-4 w-4" />
          New template
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
