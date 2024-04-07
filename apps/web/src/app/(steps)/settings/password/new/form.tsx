'use client'

import { Button, Input, toast } from '@mindfulyze/ui'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@mindfulyze/ui'
import { CREATED_CODE } from '@mindfulyze/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { createPassword } from '@/app/actions/password'
import { NewPasswordSchema } from '@/schemas/password'
import usePassword from '@lib/hooks/usePassword'
import { useRouter } from 'next/navigation'

export function NewPasswordForm() {
  const { prefetch, push } = useRouter()
  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      confirmPassword: '',
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  const { updatePassword } = usePassword()

  async function onSubmit(data: z.infer<typeof NewPasswordSchema>) {
    try {
      const res = await createPassword(data)

      if (res.status === CREATED_CODE && res.data != null) {
        prefetch('/home')

        const session = await updatePassword(res.data)

        if (session?.user.pw) {
          toast.success('The password was created, we will redirect you in a moment.')

          push('/home')
        }
      } else {
        toast.error('The password could not be created, please try again.')
      }
    } catch (e) {
      toast.error('The password could not be created, please try again.')
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                This password cannot be recovered at the moment. Please keep your password safe.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Create password
        </Button>
      </form>
    </Form>
  )
}
