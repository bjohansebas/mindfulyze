'use client'

import { createTemplate } from '@/app/actions/templates'
import { Button, toast } from '@mindfulyze/ui'
import { useRouter } from 'next/navigation'

export function EmptyTemplate() {
  const router = useRouter()

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-5 text-lg">
      <p className="text-center">Oops, it looks like you don&apos;t have any templates.</p>
      <Button
        onClick={async () => {
          toast.message('The template is being created.')

          const template = await createTemplate({ textWithFormat: '', title: 'Untitle' })
          if (template.status === 201 && template.data != null) {
            router.push(`/templates/${template.data.id}`)
          }
        }}
      >
        Create your first template
      </Button>
    </div>
  )
}
