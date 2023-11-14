import { formatDate } from '@/lib/utils'
import { SubscriptionFrequency, SubscriptionPlan } from '@prisma/client'
import { Separator } from '@ui/separator'
import { CancelButton } from '../buttons/cancel-button'
import { UpdateBillingButton } from '../buttons/update-billing-button'

export const PastDueSubscription = ({
  subscriptionPlan,
  frequency,
  lemonSqueezyId,
  renewsAt,
}: {
  lemonSqueezyId: number
  subscriptionPlan: SubscriptionPlan
  frequency: SubscriptionFrequency
  renewsAt: string
}) => {
  return (
    <>
      <div className="my-8 p-4 text-sm text-red-800 rounded-md border border-red-200 bg-red-50">
        Your latest payment failed. We will re-try this payment up to four times, after which your subscription will be
        cancelled.
        <br />
        If you need to update your billing details, you can do so below.
      </div>

      <p className="text-sm text-muted-foreground mb-2">
        You are currently on the{' '}
        <b>
          {subscriptionPlan.name} {frequency}ly
        </b>{' '}
        plan, paying ${frequency === 'month' ? subscriptionPlan.priceMonthly : subscriptionPlan.priceYearly}/
        {frequency === 'year' ? 'year' : 'month'}
      </p>

      <p className="text-sm text-muted-foreground mb-8">
        We will attempt a payment on <span className="font-bold">{formatDate(renewsAt)}</span>.
      </p>

      <Separator className="my-8" />
      <div className="mt-5 flex flex-wrap gap-4">
        <UpdateBillingButton subscriptionId={lemonSqueezyId} />
        <CancelButton subscriptionId={lemonSqueezyId} />
      </div>
    </>
  )
}
