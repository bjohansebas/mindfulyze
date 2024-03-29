'use client'

import { Button } from '@mindfulyze/ui'

import { createTemplate } from '@/app/actions/templates'
import { toast } from '@mindfulyze/ui'
import { PencilIcon } from 'lucide-react'

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
  return (
    <div className="flex">
      <Button
        className="w-full rounded-r-none"
        onClick={async () => {
          await handleCreateTemplate()
        }}
      >
        <PencilIcon className="mr-2 h-4 w-4" />
        Create thought
      </Button>
    </div>
  )
}
