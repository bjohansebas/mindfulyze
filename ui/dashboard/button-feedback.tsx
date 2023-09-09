'use client'

import { sendFeedback } from '@/app/actions/feedback'
import Spinner from '@/components/shared/icons/spinner'
import { FeedbackSchema } from '@/schemas/feedback'
import { Button } from '@/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'
import { Textarea } from '@/ui/textarea'
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/solid'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

export function ButtonFeedBack() {
  const form = useForm<z.infer<typeof FeedbackSchema>>({
    resolver: zodResolver(FeedbackSchema),
  })
  const [isOpen, setIsOpen] = useState(false)
  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof FeedbackSchema>) {
    try {
      const res = await sendFeedback(data)
      if (res.status === 201) {
        console.log(res.response)
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
        <Button onClick={() => setIsOpen((prev) => !prev)} variant="outline">
          <ChatBubbleBottomCenterTextIcon className="mr-2 h-4 w-4" /> Feedback
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
                    <Textarea placeholder="Your feedback..." className="resize-none h-28" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
              Send
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  )
}
