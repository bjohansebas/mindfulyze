'use client'

import { deleteThought, updateThought } from '@/app/actions/thoughts'
import { ThoughtSchema } from '@/schemas/thought'
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
} from '@/ui/alert-dialog'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import Editor from '@/ui/editor'
import { TiptapExtensions } from '@/ui/editor/extensions'
import { TiptapEditorProps } from '@/ui/editor/props'
import { TrashIcon } from '@heroicons/react/24/solid'
import { generateJSON, useEditor } from '@tiptap/react'
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

  const [newDate, setNewDate] = useState(createdAt)
  const debouncedUpdates = useDebouncedCallback(async ({ data }: { data: z.infer<typeof ThoughtSchema> }) => {
    try {
      setSaveStatus('Saving...')
      const response = await updateThought(id, data)
      // Simulate a delay in saving.
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

      setSaveStatus('Unsaved')
      debouncedUpdates({ data: { textWithFormat: textHTML, created: newDate } })
    },
    autofocus: 'end',
  })

  return (
    <div className="bg-white min-h-[200px]">
      <div className="flex w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-none w-full py-4 text-left font-bold" size="lg">
              {format(newDate, 'PPP')}
              {` ${saveStatus}`}
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="rounded-none h-10 hover:text-red-500" variant="ghost">
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
      <Editor editor={editor} className="h-full min-h-[200px]" />
    </div>
  )
}
