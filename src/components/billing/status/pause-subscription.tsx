import { formatDate } from '@/lib/utils'
import { SubscriptionFrequency, SubscriptionPlan } from '@prisma/client'
import { Separator } from '@ui/separator'
import { ResumeButton } from '../buttons/resume-button'
import { UnpauseButton } from '../buttons/unpause-button'

export async function PauseSubscriptionCard({
  subscriptionPlan,
  endsAt,
  frequency,
  lemonSqueezyId,
}: { lemonSqueezyId: number; subscriptionPlan: SubscriptionPlan; endsAt: string; frequency: SubscriptionFrequency }) {
  return (
    <>
      <p className="text-sm text-muted-foreground mb-2">
        You are currently on the <span className="font-bold">{subscriptionPlan.name}</span> plan, paying{' '}
        <span className="font-bold">
          ${frequency === 'month' ? subscriptionPlan.priceMonthly : subscriptionPlan.priceYearly}/
          {frequency === 'year' ? 'year' : 'month'}
        </span>
      </p>

      {/* {subscriptionPlan. ? (
        <p className="mb-8">
          Your subscription payments are currently paused. Your subscription will automatically resume on{' '}
          {formatDate(subscription.unpauseDate)}.
        </p> */}
      {/* ) : ( */}
      <p className="text-sm text-muted-foreground mb-8">Your subscription payments are currently paused.</p>
      {/* )} */}

      <Separator className="my-8" />
      <div className="mt-5 flex flex-wrap gap-4">
        <UnpauseButton subscriptionId={lemonSqueezyId} />
      </div>
    </>
  )
}
