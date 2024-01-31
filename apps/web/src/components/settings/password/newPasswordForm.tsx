'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@mindfulyze/ui'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { createPassword } from '@/app/actions/password'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import usePassword from '@/lib/hooks/usePassword'
import { NewPasswordSchema } from '@/schemas/password'

export function NewPasswordForm() {
  const router = useRouter()

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

      if (res.status === 201 && res.data != null) {
        await updatePassword(res.data)

        toast.success('The password was created, we will redirect you in a moment.')

        router.push('/home')
      } else {
        toast.error('The password could not be created, please try again.')
      }
    } catch (e) {
      console.log(e)
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
