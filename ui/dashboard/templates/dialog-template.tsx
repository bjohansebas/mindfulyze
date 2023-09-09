import {
  Dialog,
  DialogContent,
} from '@/ui/dialog'
import { Dispatch, SetStateAction } from 'react'
import EditorTemplate from './editor-template'

interface DialogTemplateProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function DialogTemaplate({ isOpen, setIsOpen }: DialogTemplateProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-3xl h-[90vh]">
        <EditorTemplate />
      </DialogContent>
    </Dialog>
  )
}
