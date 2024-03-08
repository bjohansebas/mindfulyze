'use client'

import { createThought } from '@/app/actions/thoughts'
import type { Template } from '@/types/template'
import { useAptabase } from '@aptabase/react'
import { Button, toast } from '@mindfulyze/ui'
import { PencilIcon } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export async function handleCreateThought(templateSelect?: Template) {
  try {
    toast.message('The thought is being created.')

    const response = await createThought(templateSelect?.id)

    if (response.status === 201) {
      toast.success('Thought was created.')
      return true
    }

    toast.error("The thought couldn't be created, try again anew.")
  } catch (e) {
    toast.error("The thought couldn't be created, try again anew.")
  }

  return false
}

export function CreateButton({ templates }: { templates: Template[] }) {
  const { trackEvent } = useAptabase()

  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  return (
    <Button
      className="w-full rounded-r-none px-3"
      onClick={async () => {
        const action = await handleCreateThought(templates?.find((value) => value.default) || undefined)

        if (action) {
          trackEvent('create thought')

          const params = new URLSearchParams(searchParams)

          params.set('page', '1')

          replace(`${pathname}?${params.toString()}`)
        }
      }}
    >
      <PencilIcon className="h-4 w-4" />
      <span>New thought</span>
    </Button>
  )
}
