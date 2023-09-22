import { useApp } from '@/lib/hooks/useApp'
import { Button } from '@/ui/button'

import { ThoughtSchema } from '@/schemas/thought'
import { z } from 'zod'
import { createThought } from '@/app/actions/thoughts'
import { toast } from 'sonner'

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

export function CreateThought() {
  const { setTemplates, templateSelect } = useApp()

  return (
    <Button className="rounded-r-none" onClick={async () => {
      await handleCreateThought(templateSelect)
      setTemplates((prev) => {
        const templates = [...prev]

        const templateSelect = templates.find((value) => value.isSelect)

        if (templateSelect != null) {
          templateSelect.isSelect = false
        }

        const newSelect = templates.find((value) => value.default)

        if (newSelect != null) {
          newSelect.isSelect = true
        }

        return templates
      })
    }}>Create thought</Button>
  )
}
