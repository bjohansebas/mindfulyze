import { Separator } from '@ui/separator'
import { Skeleton } from '@ui/skeleton'
import { Suspense } from 'react'
import { CancelButton } from '../buttons/cancel-button'
import { UpdateBillingButton } from '../buttons/update-billing-button'

export const UnpaidSubscription = ({
  lemonSqueezyId,
}: {
  lemonSqueezyId: number
}) => {
  /*
    Unpaid subscriptions have had four failed recovery payments.
    If you have dunning enabled in your store settings, customers will be sent emails trying to reactivate their subscription.
    If you don't have dunning enabled the subscription will remain "unpaid".
    */
  return (
    <>
      <p className="text-sm text-muted-foreground mb-2">
        We haven&apos;t been able to make a successful payment and your subscription is currently marked as unpaid.
      </p>

      <p className="text-sm text-muted-foreground mb-8">Please update your billing information to regain access.</p>

      <Separator className="my-8" />
      <div className="mt-5 flex flex-wrap gap-4">
        <Suspense fallback={<Skeleton className="w-[228px] h-9" />}>
          <UpdateBillingButton subscriptionId={lemonSqueezyId} />
        </Suspense>
        <CancelButton subscriptionId={lemonSqueezyId} />
      </div>
    </>
  )
}
