'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { encryptPassword } from '@/app/actions/password'
import { verifyPassword } from '@/app/actions/user'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import usePassword from '@/lib/hooks/usePassword'
import { SetPasswordSchema } from '@/schemas/password'
import { Button, toast } from '@mindfulyze/ui'
import { useRouter } from 'next/navigation'

export function SetPasswordForm() {
  const router = useRouter()

  const form = useForm<z.infer<typeof SetPasswordSchema>>({
    resolver: zodResolver(SetPasswordSchema),
    defaultValues: {
      password: '',
    },
  })

  const { isSubmitting } = form.formState

  const { updatePassword } = usePassword()

  async function onSubmit(data: z.infer<typeof SetPasswordSchema>) {
    try {
      const res = await verifyPassword(data)

      if (res) {
        const pwHash = await encryptPassword(data.password)

        await updatePassword(pwHash)

        toast.success('The password is correct, we will redirect you in a moment.')

        router.push('/home')
      } else {
        toast.error('The password is incorrect, please try again.')
      }
    } catch (e) {
      console.log(e)
      toast.error('The password is incorrect, please try again.')
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          Verify
        </Button>
      </form>
    </Form>
  )
}
