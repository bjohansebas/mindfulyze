'use client'

import { Button, Input, LoadingSpinner, toast } from '@mindfulyze/ui'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@mindfulyze/ui'

import { zodResolver } from '@hookform/resolvers/zod'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { updateName } from '@/app/actions/user'
import { NameFormSchema } from '@schemas/user'

export function NameForm() {
  const { data: session, update } = useSession()

  const form = useForm<z.infer<typeof NameFormSchema>>({
    resolver: zodResolver(NameFormSchema),
    defaultValues: {
      name: session?.user.name || '',
    },
    values: {
      name: session?.user.name || '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof NameFormSchema>) {
    try {
      const res = await updateName(data)

      if (res) {
        await update({ name: data.name })

        toast.success('Successfully updated your name!')
      } else {
        toast.error('Something went wrong')
      }
    } catch (e) {
      console.log(e)
      toast.error('Something went wrong')
    }
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Steve jobs" {...field} />
              </FormControl>
              <FormDescription>This is the name that will be displayed on your profile and in emails.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting || session?.user?.name === form.getValues().name}
          className="gap-2"
        >
          {isSubmitting ? <LoadingSpinner /> : null}
          Save Changes
        </Button>
      </form>
    </Form>
  )
}
