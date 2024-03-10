'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@mindfulyze/ui'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@mindfulyze/ui'
import { Button, LoadingSpinner, Textarea, toast } from '@mindfulyze/ui'

import { sendFeedback } from '@/app/actions/feedback'
import { FeedbackSchema } from '@/schemas/feedback'

import { MessageSquareTextIcon } from 'lucide-react'

import { useAptabase } from '@aptabase/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export function ButtonFeedBack({ setOpen }: { setOpen?: Dispatch<SetStateAction<boolean>> }) {
  const { trackEvent } = useAptabase()

  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
  })
  const [isOpen, setIsOpen] = useState(false)
  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof FeedbackSchema>) {
    try {
      const res = await sendFeedback(data)

      if (setOpen != null) {
        setOpen(false)
      }

      if (res.status === 201) {
        trackEvent('send feedback')

        toast.success('Your feedback has been received! Thank you for your help.')
      } else {
        toast.success("Oops, your feedback couldn't be sent, please try again.")
      }
    } catch (e) {
      console.error(e)
      toast.success("Oops, your feedback couldn't be sent, please try again.")
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button onClick={() => setIsOpen((prev) => !prev)} variant="outline" className="w-full justify-start">
          <MessageSquareTextIcon className="h-4 w-4" /> Feedback
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px]" align="start">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="feedback"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Your feedback..." className="h-28 resize-none" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <LoadingSpinner />}
              Send
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
