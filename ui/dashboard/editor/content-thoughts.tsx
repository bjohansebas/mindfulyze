'use client'

import { updateThought } from '@/app/actions/thoughts'
import { ThoughtSchema } from '@/schemas/thought'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import Editor from '@/ui/editor'
import { TiptapExtensions } from '@/ui/editor/extensions'
import { TiptapEditorProps } from '@/ui/editor/props'
import { generateJSON, useEditor } from '@tiptap/react'
import { format } from 'date-fns'
import { useState } from 'react'
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
    <form className="flex flex-col bg-white w-full h-full min-h-[200px] gap-3 overflow-x-hidden">
      <div className="flex justify-between w-full items-center flex-wrap gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full py-4 text-left font-bold" size="lg">
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
      </div>
      <Editor editor={editor} className="h-full min-h-[200px]" />
    </form>
  )
}
