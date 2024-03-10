'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@mindfulyze/ui'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@mindfulyze/ui'
import { LoadingSpinner } from '@mindfulyze/ui'
import { Button, Input, toast } from '@mindfulyze/ui'
import { CONFIRM_MESSAGE } from '@mindfulyze/utils'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { deleteAccount } from '@/app/actions/user'
import { DeleteAccountSchemaForm } from '@/schemas/user'

import { signOut } from 'next-auth/react'
import type { z } from 'zod'

export function DeleteAccountForm() {
  const form = useForm<z.infer<typeof DeleteAccountSchemaForm>>({
    resolver: zodResolver(DeleteAccountSchemaForm),
    defaultValues: {
      password: '',
      confirm_text: '',
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof DeleteAccountSchemaForm>) {
    try {
      const res = await deleteAccount(data)
      if (res) {
        signOut({
          callbackUrl: '/login',
        })
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
    <div className="rounded-lg border border-red-600 bg-card">
      <div className="flex flex-col space-y-3 p-7">
        <h2 className="font-medium text-xl">Delete Account</h2>
        <p className="text-gray-200 text-sm">
          Permanently delete your Mindfulyze account and all of your thoughts. This action cannot be undone - please
          proceed with caution.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[446px]">
            <DialogHeader className="gap-3 sm:text-center">
              <DialogTitle>Delete Account</DialogTitle>
              <DialogDescription className="text-gray-200">
                Warning: This will permanently delete your account and all your thoughts.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">Confirm your password:</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirm_text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground">
                        To verify, type <span className="font-semibold text-foreground">{CONFIRM_MESSAGE}</span> account
                        below:
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isSubmitting} className="gap-2" variant="destructive">
                    {isSubmitting ? <LoadingSpinner /> : null}
                    Delete Account
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
