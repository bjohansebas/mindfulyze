'use client'

import { createBookmark } from '@actions/bookmarks'
import { useAptabase } from '@aptabase/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, toast } from '@mindfulyze/ui'
import { CreateBookmarkSchema } from '@schemas/bookmark'
import type { Dispatch, SetStateAction } from 'react'

import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export function CreateCollection({ setOpen }: { setOpen: Dispatch<SetStateAction<boolean>> }) {
  const { trackEvent } = useAptabase()

  const form = useForm<z.infer<typeof CreateBookmarkSchema>>({
    resolver: zodResolver(CreateBookmarkSchema),
    defaultValues: {
      name: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof CreateBookmarkSchema>) {
    try {
      toast.message('The collection is being created.')

      const response = await createBookmark(values)

      if (response.status === 201) {
        trackEvent('create new collection')

        toast.success('The collection was created.')
      } else {
        toast.error("The collection couldn't be created, try again anew.")
      }

      setOpen(false)
    } catch (e) {
      toast.error("The collection couldn't be created, try again anew.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-end gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name of collection</FormLabel>
              <FormControl>
                <Input placeholder="sunday" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Create collection
        </Button>
      </form>
    </Form>
  )
}
