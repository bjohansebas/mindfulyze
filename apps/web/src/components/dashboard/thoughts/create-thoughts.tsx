'use client'

import { createThought } from '@/app/actions/thoughts'
import { Button } from '@/components/ui/button'
import { Template } from '@/types/template'
import { cn } from '@mindfulyze/utils'
import MenuTemplate from '../templates/menu-template'

import { PencilIcon } from '@heroicons/react/24/solid'
import { usePathname, useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { toast } from 'sonner'

export async function handleCreateThought(templateSelect?: Template) {
  try {
    toast.message('The thought is being created.')

    const response = await createThought(templateSelect?.id)

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
}: { templates?: Template[]; setOpen?: Dispatch<SetStateAction<boolean>> }) {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <div className="flex">
      <Button
        className={cn('w-full rounded-r-none', { 'rounded-md': templates == null })}
        onClick={async () => {
          await handleCreateThought(templates?.find((value) => value.default) || undefined)
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
      {templates != null ? <MenuTemplate templates={templates} /> : null}
    </div>
  )
}
