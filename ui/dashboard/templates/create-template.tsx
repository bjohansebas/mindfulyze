'use client'

import { useApp } from '@/lib/hooks/useApp'
import { Button } from '@/ui/button'

import { createTemplate } from '@/app/actions/templates'
import { createThought } from '@/app/actions/thoughts'
import { PencilIcon } from '@heroicons/react/24/solid'
import { toast } from 'sonner'
import MenuTemplate from '../templates/menu-template'

export async function handleCreateTemplate() {
  try {
    toast.message('The template is being created.')

    const response = await createTemplate({ textWithFormat: '', title: 'untitle' })

    if (response.status === 201) {
      toast.success('Template was created.')
    } else {
      toast.error("The template couldn't be created, try again anew.")
    }
  } catch (e) {
    toast.error("The template couldn't be created, try again anew.")
  }
}

export function ButtonCreateTemplate() {
  const { templateSelect } = useApp()

  return (
    <div className="flex">
      <Button
        className="w-full rounded-r-none"
        onClick={async () => {
          await handleCreateTemplate()
        }}
      >
        <PencilIcon className="w-4 h-4 mr-2" />
        Create thought
      </Button>
      <MenuTemplate />
    </div>
  )
}
