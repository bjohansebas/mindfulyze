'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { updateEmail } from '@/app/actions/user'
import { Input } from '@/components/ui/input'
import { EmailFormSchema } from '@/schemas/user'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@mindfulyze/ui'
import { Button, LoadingSpinner, toast } from '@mindfulyze/ui'

import { useSession } from 'next-auth/react'
import type { z } from 'zod'

export function EmailForm() {
  const { data: session, update } = useSession()

  const form = useForm<z.infer<typeof EmailFormSchema>>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: session?.user.email || '',
    },
    values: {
      email: session?.user.email || '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof EmailFormSchema>) {
    try {
      const res = await updateEmail(data)

      if (res) {
        await update({ email: data.email })

        toast.success('Successfully updated your email!')
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="panic@thedis.co" {...field} />
              </FormControl>
              <FormDescription>
                This will be the email you use to log in to Mindfulyze and receive notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmitting || session?.user?.email === form.getValues().email}
          className="gap-2"
        >
          {isSubmitting ? <LoadingSpinner /> : null}
          Save Changes
        </Button>
      </form>
    </Form>
  )
}
