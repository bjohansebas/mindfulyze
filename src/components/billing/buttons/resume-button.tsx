'use client'

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
} from '@/components/ui/alert-dialog'
import { Button } from '@ui/button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { resumeSubscription } from '../actions/subscription'

export function ResumeButton({ subscriptionId }: { subscriptionId: number }) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleCancel(e) {
    e.preventDefault()

    setIsLoading(true)
    const res = await resumeSubscription(subscriptionId)

    if (!res.data) {
      toast.success(res.message)
    } else {
      toast.success('Your subscription is now active again!')
    }

    setIsLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isLoading}>
          Resume your subscription
          <Loader2
            size={16}
            className={`animate-spin inline-block relative top-[-1px] ml-2 w-8${!isLoading ? ' hidden' : ' inline'}`}
          />
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
            <Button onClick={handleCancel} variant="destructive">
              Resume
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
