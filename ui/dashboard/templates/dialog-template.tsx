import { Dialog, DialogContent } from '@/ui/dialog'
import EditorTemplate from './editor-template'
import { useApp } from '@/lib/hooks/useApp'

import { Dispatch, SetStateAction } from 'react'

interface DialogTemplateProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function DialogTemplate({ isOpen, setIsOpen }: DialogTemplateProps) {
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
      <DialogContent className="sm:max-w-3xl h-[95vh] w-[90vw] overflow-x-hidden">
        <EditorTemplate setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  )
}
