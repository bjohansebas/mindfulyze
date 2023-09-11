import { Button } from '@/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog'
import EditorThought from './editor-thought'
import { useApp } from '@/lib/hooks/useApp'

import { Dispatch, SetStateAction } from 'react'

interface DialogThoughtProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function DialogThought({ isOpen, setIsOpen }: DialogThoughtProps) {
  const { setTemplates } = useApp()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(value) => {
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

        setIsOpen(value.valueOf())
      }}
    >
      <DialogTrigger asChild>
        <Button className="rounded-r-none">Create thought</Button>
      </DialogTrigger>
      <DialogContent id="dialog" className="sm:max-w-3xl h-[90vh] pt-10 overflow-x-hidden">
        <EditorThought />
      </DialogContent>
    </Dialog>
  )
}
