'use client'

import { Button } from '@/components/ui/button'

import { Template } from '@/@types/template'
import { createThought } from '@/app/actions/thoughts'
import { ThoughtSchema } from '@/schemas/thought'
import { PencilIcon } from '@heroicons/react/24/solid'
import { usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'
import MenuTemplate from '../templates/menu-template'

export async function handleCreateThought(templateSelect) {
  const data: z.infer<typeof ThoughtSchema> = {
    created: new Date(),
    textWithFormat: templateSelect?.text || '',
  }

  try {
    toast.message('The thought is being created.')

    const response = await createThought(data)

    if (response.status === 201) {
      toast.success('Thought was created.')
    } else {
      toast.error("The thought couldn't be created, try again anew.")
    }
  } catch (e) {
    toast.error("The thought couldn't be created, try again anew.")
  }
}

export function CreateThought({
  templates,
  setOpen,
}: { templates: Template[]; setOpen?: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex">
      <Button
        className="w-full rounded-r-none"
        onClick={async () => {
          await handleCreateThought(templates.find((value) => value.default))
          if (setOpen != null) {
            setOpen(false)
          }
          if (pathname !== '/home') {
            router.push('/home')
          }
        }}
      >
        <PencilIcon className="w-4 h-4 mr-2" />
        Create thought
      </Button>
      <MenuTemplate templates={templates} />
    </div>
  )
}
