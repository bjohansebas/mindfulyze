import { formatDate } from '@/lib/utils'
import { SubscriptionFrequency, SubscriptionPlan } from '@prisma/client'
import { Button } from '@ui/button'
import { Separator } from '@ui/separator'

export async function ActiveSubscriptionCard({
  subscriptionPlan,
  renewsAt,
  frequency,
}: { subscriptionPlan: SubscriptionPlan; renewsAt: string; frequency: SubscriptionFrequency }) {
  return (
    <>
      <p className="text-sm text-muted-foreground mb-2">
        You are currently on the <span className="font-bold">{subscriptionPlan.name}</span> plan, paying{' '}
        <span className="font-bold">
          ${frequency === 'month' ? subscriptionPlan.priceMonthly : subscriptionPlan.priceYearly}/
          {frequency === 'year' ? 'year' : 'month'}
        </span>
      </p>
      <p className="text-sm text-muted-foreground mb-2">
        You next renewal will be on <span className="font-bold">{formatDate(renewsAt)}</span>
      </p>
      <Separator className="my-8" />
      <div className="mt-5 flex flex-wrap gap-4">
        <Button>Change plan</Button>
        <Button variant="ghost">Update your payment method</Button>
        <Button variant="ghost">Pause payments</Button>
        <Button variant="ghost">Cancel</Button>
      </div>
    </>
  )
}
