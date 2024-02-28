'use client'

import { useRouter } from 'next/navigation'

import { createThought } from '@/app/actions/thoughts'
import { Button, toast } from '@mindfulyze/ui'
import { OptionsCardTemplate } from './options-card-template'

export interface CardTemplateProps {
  title: string
  id: string
}

export function CardTemplate({ title, id }: CardTemplateProps) {
  const router = useRouter()

  return (
    <div className="font-medium px-6 py-2 w-full bg-card border rounded-lg flex justify-between items-center">
      <Button
        variant="ghost"
        className="w-full justify-start hover:bg-transparent px-0"
        onClick={async () => {
          toast.message('The thought is being created.')

          const response = await createThought(id)
          if (response.status === 201 && response.data != null) {
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
