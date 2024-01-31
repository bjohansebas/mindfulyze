'use client'

import { toast } from '@mindfulyze/ui'

import { Editor } from '@mindfulyze/editor'
import { useState } from 'react'

import { deleteTemplate, updateTemplate, updateTitleTemplate } from '@/app/actions/templates'
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
import { Template } from '@/types/template'
import { TrashIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'

interface EditorTemplateProps {
  data: Template
}

export function EditorTemplate({ data: { text, title, id } }: EditorTemplateProps) {
  const router = useRouter()

  const [saveStatus, setSaveStatus] = useState('')
  const [newTitle, setNewTitle] = useState(title)

  const debouncedUpdates = useDebouncedCallback(async ({ data }: { data: string }) => {
    try {
      setSaveStatus('Saving...')
      const response = await updateTitleTemplate(id, data, `templates/${id}`)

      if (response.data) {
        setSaveStatus('')
      } else {
        setSaveStatus('Unsaved')
      }
    } catch (e) {
      console.log(e)
    }
  }, 1000)

  return (
    <div className="h-full w-full">
      <div className="flex w-full border-b px-4 py-2 justify-between">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Untitled"
            value={newTitle}
            onChange={async (e) => {
              setSaveStatus('Unsaved')
              setNewTitle(e.target.value)
              debouncedUpdates({ data: e.target.value })
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
      <Editor
        onDebouncedUpdate={async (editor) => {
          if (editor) {
            const textHTML = editor.getHTML()

            try {
              setSaveStatus('Saving...')
              const response = await updateTemplate(
                id,
                { textWithFormat: textHTML, title: newTitle },
                `templates/${id}`,
              )

              if (response.data) {
                setSaveStatus('')
              } else {
                setSaveStatus('Unsaved')
              }
            } catch (e) {
              console.log(e)
            }
          }
        }}
        text={text}
        className=""
        debounceDuration={2000}
        onUpdate={(editor) => {
          if (editor != null) {
            const textHTML = editor.getHTML()

            if (text !== textHTML) {
              setSaveStatus('Unsaved')
            }
          }
        }}
      />
    </div>
  )
}

export default EditorTemplate
