'use client'

import { Editor } from '@mindfulyze/editor'
import { Button } from '@mindfulyze/ui'

import { deleteThought, updateDateThought, updateThought } from '@/app/actions/thoughts'
import { format } from 'date-fns'

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
import { Calendar } from '@/components/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { TrashIcon } from '@heroicons/react/24/solid'
import { toast } from '@mindfulyze/ui'
import { useState } from 'react'

export interface ContentThoughtsProps {
  text: string
  createdAt: Date
  id: string
}
export function ThoughtEditor({ text, createdAt, id }: ContentThoughtsProps) {
  const [saveStatus, setSaveStatus] = useState('')
  const [disabled, setDisabled] = useState(false)

  const [newDate, setNewDate] = useState(createdAt)

  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between py-3">
        <div className="flex gap-3 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger disabled={disabled}>{format(newDate, 'LLL dd, y')}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={async (date) => {
                  setNewDate(date || createdAt)
                  await updateDateThought(id, date || createdAt)
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
            <Button className="hover:text-red-500" variant="ghost" disabled={disabled}>
              <TrashIcon className="h-5 w-5" />
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
      <Editor
        onUpdate={(editor) => {
          if (editor != null) {
            const textHTML = editor.getHTML()

            if (text !== textHTML) {
              setSaveStatus('Unsaved')
            }
          }
        }}
        autofocus={false}
        text={text}
        editable={disabled}
        className="bg-background border-primary border rounded-xl"
        onDebouncedUpdate={async (editor) => {
          if (editor) {
            const textHTML = editor.getHTML()
            if (text !== textHTML) {
              try {
                setSaveStatus('Saving...')
                const response = await updateThought(id, { created: newDate, textWithFormat: textHTML })

                if (response.data) {
                  setSaveStatus('')
                } else {
                  setSaveStatus('Unsaved')
                }
              } catch (e) {
                console.log(e)
              }
            }
          }
        }}
      />
    </div>
  )
}
