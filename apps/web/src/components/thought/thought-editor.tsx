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
import { CREATED_CODE, cn } from '@mindfulyze/utils'

import { addThoughtToBookmark, removeBookmarkFromThought } from '@actions/bookmarks'
import { deleteThought, updateDateThought, updateTextThought } from '@actions/thought'
import { CreateCollection } from './bookmark/create-collection'

import { useAptabase } from '@aptabase/react'
import { compareAsc, format } from 'date-fns'
import { BookmarkIcon, CheckIcon, TrashIcon } from 'lucide-react'
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
  const { trackEvent } = useAptabase()
  const [saveStatus, setSaveStatus] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [newCollection, setNewCollection] = useState(false)
  const [loadingId, setLoadingId] = useState('')
  const [openMenu, setOpenMenu] = useState(false)

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
                  if (date != null && compareAsc(date, newDate) !== 0) {
                    const response = await updateDateThought({ id, created: date || createdAt })

                    if (response.status === CREATED_CODE) {
                      trackEvent('Update date of thought')
                    }
                  }
                  setNewDate(date || createdAt)
                }}
                disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                initialFocus
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-sm">{`${saveStatus}`}</span>
        </div>
        <div className="flex gap-2">
          <Popover open={openMenu} onOpenChange={setOpenMenu}>
            <PopoverTrigger asChild>
              <Button variant="ghost" className="px-2" disabled={disabled}>
                <BookmarkIcon className={cn('size-5', { 'fill-slate-50': thoughtBookmarks.length >= 1 })} />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-[300px]">
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
              {newCollection ? (
                <CreateCollection setOpen={setOpenMenu} />
              ) : (
                <ul className="flex flex-col gap-2">
                  {userBookmarks.length > 0 ? (
                    userBookmarks.map(({ name, ...res }) => {
                      const hasThoughtBookmark = thoughtBookmarks.findIndex(({ bookmarkId }) => bookmarkId === res.id)

                      return (
                        <Button
                          key={res.id}
                          className="w-full justify-between"
                          variant={hasThoughtBookmark >= 0 ? 'surface' : 'outline'}
                          disabled={loadingId === res.id}
                          onClick={async () => {
                            try {
                              setLoadingId(res.id)
                              if (hasThoughtBookmark < 0) {
                                const response = await addThoughtToBookmark({ bookmarkId: res.id, thoughtId: id })
                                if (response.status === CREATED_CODE) {
                                  trackEvent('add thought to bookmark')
                                }
                              } else {
                                const response = await removeBookmarkFromThought({
                                  id: thoughtBookmarks[hasThoughtBookmark].id,
                                })

                                if (response.status === CREATED_CODE) {
                                  trackEvent('remove thought from bookmark')
                                }
                              }
                            } catch (e) {
                            } finally {
                              setLoadingId('')
                            }
                          }}
                        >
                          {name}
                          {hasThoughtBookmark >= 0 ? <CheckIcon className="size-4" /> : null}
                        </Button>
                      )
                    })
                  ) : (
                    <div className="flex flex-col items-center gap-5 p-5">
                      <p className="text-center">Oops, it looks like there are no collections available</p>
                      <Button
                        className="h-fit"
                        onClick={async () => {
                          setNewCollection((val) => !val)
                        }}
                      >
                        Create your first collection
                      </Button>
                    </div>
                  )}
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
                        trackEvent('delete thought')

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
