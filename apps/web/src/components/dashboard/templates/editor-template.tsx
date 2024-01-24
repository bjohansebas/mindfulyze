'use client'

import { toast } from 'sonner'
import * as z from 'zod'

import { TiptapExtensions } from '@/components/editor/extensions'
import { TiptapEditorProps } from '@/components/editor/props'
import { useEditor } from '@tiptap/react'
import { useState } from 'react'

import { deleteTemplate, updateTemplate } from '@/app/actions/templates'
import Editor from '@/components/editor'
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
import { Input } from '@/components/ui/input'
import { TemplateSchema } from '@/schemas/template'
import { Template } from '@/types/template'
import { TrashIcon } from '@heroicons/react/24/solid'
import { generateJSON } from '@tiptap/html'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface EditorTemplateProps {
  data: Template
}

export function EditorTemplate({ data: { text, title, id } }: EditorTemplateProps) {
  const router = useRouter()

  const [saveStatus, setSaveStatus] = useState('')
  const [newTitle, setNewTitle] = useState(title)

  const debouncedUpdates = useDebouncedCallback(async ({ data }: { data: z.infer<typeof TemplateSchema> }) => {
    try {
      setSaveStatus('Saving...')
      const response = await updateTemplate(id, data, `templates/${id}`)

      if (response.data) {
        setSaveStatus('')
      } else {
        setSaveStatus('Unsaved')
      }
    } catch (e) {
      console.log(e)
    }
  }, 2000)

  const editor = useEditor({
    content: generateJSON(text, TiptapExtensions),
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: ({ editor }) => {
      const textHTML = editor.getHTML()

      setSaveStatus('Unsaved')
      debouncedUpdates({ data: { textWithFormat: textHTML, title: newTitle } })
    },
    autofocus: 'end',
  })

  return (
    <div className="h-full w-full">
      <div className="flex w-full border-b px-4 py-2 justify-between">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Untitled"
            value={newTitle}
            onChange={(e) => {
              setSaveStatus('Unsaved')
              setNewTitle(e.target.value)
              debouncedUpdates({ data: { textWithFormat: editor?.getHTML() || '', title: e.target.value } })
            }}
          />
          <span className="text-sm">{`${saveStatus}`}</span>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="hover:text-red-500" variant="ghost" size="sm">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. It will permanently delete the template and remove it from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button
                  onClick={async () => {
                    toast.message('The thought is being erased, please wait a moment.')
                    const res = await deleteTemplate(id, `/templates/${id}`)

                    if (!res.data) {
                      toast.error(res.message)
                    } else {
                      router.push('/templates')
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
      <Editor editor={editor} />
    </div>
  )
}

export default EditorTemplate
