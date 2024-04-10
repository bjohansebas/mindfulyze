'use client'

import { Editor } from '@mindfulyze/editor'
import { Button, Calendar, toast } from '@mindfulyze/ui'
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
} from '@mindfulyze/ui'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

import { format } from 'date-fns'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'

import { deleteThought } from '@/app/actions/thoughts'
import { updateDateThought, updateTextThought } from '@actions/thought'

export interface ContentThoughtsProps {
  text: string
  createdAt: Date
  id: string
  classNameHeader?: string
}
export function ThoughtEditor({ text, createdAt, id, classNameHeader }: ContentThoughtsProps) {
  const [saveStatus, setSaveStatus] = useState('')
  const [disabled, setDisabled] = useState(false)

  const [newDate, setNewDate] = useState(createdAt)

  return (
    <div className="flex w-full max-w-full flex-col">
      <div className={cn('flex w-full justify-between py-3', classNameHeader)}>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger disabled={disabled}>{format(newDate, 'LLL dd, y')}</DropdownMenuTrigger>
            <DropdownMenuContent>
              <Calendar
                mode="single"
                selected={newDate}
                onSelect={async (date) => {
                  setNewDate(date || createdAt)
                  await updateDateThought({ id, created: date || createdAt })
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
        className="rounded-xl border border-primary"
        onDebouncedUpdate={async (editor) => {
          if (editor) {
            const textHTML = editor.getHTML()
            if (text !== textHTML) {
              try {
                setSaveStatus('Saving...')
                const response = await updateTextThought({ id, text: textHTML })

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
