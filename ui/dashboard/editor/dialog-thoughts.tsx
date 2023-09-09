import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/ui/dialog'
import EditorThought from './editor-thought'
import { Dispatch, SetStateAction } from 'react'

interface DialogThoughtProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function DialogThought({ isOpen, setIsOpen }: DialogThoughtProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='rounded-r-none'>Create thought</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl h-[70vh]">
        <EditorThought />
      </DialogContent>
    </Dialog>
  )
}
