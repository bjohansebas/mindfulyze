'use client'

import type { Bookmark, BookmarkThoughts } from '@mindfulyze/database'
import { Editor } from '@mindfulyze/editor'
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger, toast } from '@mindfulyze/ui'
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

import { addThoughtToBookmark } from '@actions/bookmarks'
import { deleteThought, updateDateThought, updateTextThought } from '@actions/thought'

import { format } from 'date-fns'
import { BookmarkIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'

export interface ContentThoughtsProps {
  text: string
  createdAt: Date
  id: string
  classNameHeader?: string
  userBookmarks: Bookmark[]
  thoughtBookmarks: BookmarkThoughts[]
}

export function ThoughtEditor({
  text,
  createdAt,
  id,
  classNameHeader,
  userBookmarks,
  thoughtBookmarks,
}: ContentThoughtsProps) {
  const [saveStatus, setSaveStatus] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [newCollection, setNewCollection] = useState(false)

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
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="px-2" disabled={disabled}>
                <BookmarkIcon className="size-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <header className="mb-3 flex justify-between">
                <h2 className="font-semibold text-sm">Collections</h2>
                <Button
                  variant="link"
                  className="h-fit p-0"
                  onClick={async () => {
                    setNewCollection((val) => !val)
                  }}
                >
                  New collection
                </Button>
              </header>
              {newCollection ? null : (
                <ul className="flex flex-col gap-2">
                  {userBookmarks.map(({ name, ...res }) => {
                    const mathThoguht = thoughtBookmarks.findIndex(({ bookmarkId }) => bookmarkId === res.id)
                    console.log(mathThoguht)
                    return (
                      <Button
                        key={res.id}
                        className="w-full justify-start"
                        variant={mathThoguht >= 0 ? 'surface' : 'outline'}
                        onClick={async () => {
                          if (mathThoguht < 0) await addThoughtToBookmark({ bookmarkId: res.id, thoughtId: id })
                        }}
                      >
                        {name}
                      </Button>
                    )
                  })}
                </ul>
              )}
            </PopoverContent>
          </Popover>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className="px-2 hover:text-destructive" variant="ghost" disabled={disabled}>
                <TrashIcon className="size-5" />
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
                      const res = await deleteThought({ id })
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
