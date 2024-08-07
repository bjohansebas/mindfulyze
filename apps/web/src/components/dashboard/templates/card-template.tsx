'use client'

import { Button, toast } from '@mindfulyze/ui'
import { CREATED_CODE } from '@mindfulyze/utils'

import { useRouter } from 'next/navigation'

import { createThought } from '@actions/thought'
import { OptionsCardTemplate } from './options-card-template'

export interface CardTemplateProps {
  title: string
  id: string
}

export function CardTemplate({ title, id }: CardTemplateProps) {
  const router = useRouter()

  return (
    <div className="flex w-full items-center justify-between rounded-lg border bg-card px-6 py-2 font-medium">
      <Button
        variant="ghost"
        className="w-full justify-start px-0 hover:bg-transparent"
        onClick={async () => {
          toast.message('The thought is being created.')

          const response = await createThought({ template: id })
          if (response.status === CREATED_CODE && response.data != null) {
            router.push('/home')
            toast.success('Thought was created.')
          } else {
            toast.error("The thought couldn't be created, try again anew.")
          }
        }}
      >
        {title.trim().length === 0 ? 'Untitle' : title}
      </Button>
      <OptionsCardTemplate id={id} />
    </div>
  )
}
