'use client'

import { deleteThought, updateThought } from '@/app/actions/thoughts'
import { Editor, TiptapEditorProps, TiptapExtensions } from '@mindfulyze/editor'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ThoughtSchema } from '@/schemas/thought'

import { TrashIcon } from '@heroicons/react/24/solid'
import { generateJSON } from '@tiptap/html'
import { useEditor } from '@tiptap/react'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'
import { useDebouncedCallback } from 'use-debounce'
import { z } from 'zod'

export interface ContentThoughtsProps {
  text: string
  createdAt: Date
  id: string
}
export function ContentThoughts({ text, createdAt, id }: ContentThoughtsProps) {
  const [saveStatus, setSaveStatus] = useState('')
  const [disabled, setDisabled] = useState(false)

  const [newDate, setNewDate] = useState(createdAt)

  const debouncedUpdates = useDebouncedCallback(async ({ data }: { data: z.infer<typeof ThoughtSchema> }) => {
    try {
      setSaveStatus('Saving...')
      const response = await updateThought(id, data)

      if (response.data) {
        setSaveStatus('')
      } else {
        setSaveStatus('Unsaved')
      }
    } catch (e) {
      console.log(e)
    }
  }, 1000)

  const editor = useEditor({
    content: generateJSON(text || '', TiptapExtensions),
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: ({ editor }) => {
      const textHTML = editor.getHTML()

      if (text !== textHTML) {
        setSaveStatus('Unsaved')
        debouncedUpdates({ data: { textWithFormat: textHTML, created: newDate } })
      }
    },
    autofocus: false,
  })

  return (
    <div className="h-[70vh] w-full">
      <div className="flex w-full border-b px-4 py-2 justify-between">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" disabled={disabled}>
                {format(newDate, 'PPP')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={async (date) => {
                  setNewDate(date || createdAt)
                  await updateThought(id, { textWithFormat: editor?.getHTML() || '', created: date || createdAt })
                }}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-sm">{`${saveStatus}`}</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="hover:text-red-500" variant="ghost" size="sm" disabled={disabled}>
              <TrashIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete the thought and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={async () => {
                    editor?.setEditable(false)
                    setDisabled(true)
                    toast.message('The thought is being erased, please wait a moment.')
                    const res = await deleteThought(id)
                    if (!res.data) {
                      toast.error(res.message)
                    } else {
                      toast.success('The thought has been successfully deleted.')
                    }
                  }}
                  variant="destructive"
                >
                  Delete
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <Editor editor={editor} className="h-[calc(70vh-50px)]" />
    </div>
  )
}
