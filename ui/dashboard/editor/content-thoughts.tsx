'use client'

import { updateThought } from '@/app/actions/thoughts'
import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import { useDebouncedCallback } from "use-debounce";
import Editor from '@/ui/editor'
import { TiptapExtensions } from '@/ui/editor/extensions'
import { TiptapEditorProps } from '@/ui/editor/props'
import { generateJSON, useEditor } from '@tiptap/react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import { z } from 'zod'
import { ThoughtSchema } from '@/schemas/thought'

export interface ContentThoughtsProps {
  text: string
  createdAt: Date,
  id: string
}
export function ContentThoughts({ text, createdAt, id }: ContentThoughtsProps) {
  const [newDate, setNewDate] = useState(createdAt)
  const debouncedUpdates = useDebouncedCallback(async ({ data }: { data: z.infer<typeof ThoughtSchema> }) => {
    try {
      await updateThought(id, data)
    } catch (e) {
      console.log(e)
    }
  }, 1000);

  const editor = useEditor({
    content: generateJSON(text || '', TiptapExtensions),
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: ({ editor }) => {
      const textHTML = editor.getHTML()

      debouncedUpdates({ data: { textWithFormat: textHTML, created: newDate } })
    },
    autofocus: 'end',
  })

  return (
    <form
      className="flex flex-col bg-white rounded-lg h-full max-h-[80vh] gap-3 overflow-x-hidden"
    >
      <Editor editor={editor} className="border rounded-xl sm:h-[70vh] h-[65vh]" />
      <div className="flex justify-between items-center flex-wrap gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant={'outline'}
              className={cn('w-[240px] pl-3 text-left font-normal')}
            >
              {format(newDate, 'PPP')}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
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
    </form>
  )
}
