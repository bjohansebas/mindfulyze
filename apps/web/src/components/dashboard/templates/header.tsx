'use client'

import { createTemplate } from '@/app/actions/templates'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function HeaderTemplate() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <nav className="w-full flex justify-between items-center">
      <h1 className="font-bold">Templates</h1>
      <Button
        onClick={async () => {
          toast.message('The template is being created.')

          const template = await createTemplate({ textWithFormat: '', title: 'Untitle' }, pathname)
          if (template.status === 201 && template.data != null) {
            router.push(`/templates/${template.data.id}`)
          }
        }}
      >
        New template
      </Button>
    </nav>
  )
}
