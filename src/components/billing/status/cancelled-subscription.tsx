import { formatDate } from '@/lib/utils'
import { SubscriptionFrequency, SubscriptionPlan } from '@prisma/client'
import { Separator } from '@ui/separator'
import { ResumeButton } from '../buttons/resume-button'

export async function CancelledSubscriptionCard({
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
      <p className="text-sm text-muted-foreground xmb-8">
        Your subscription has been cancelled and <b>will end on {formatDate(endsAt)}</b>. After this date you will no
        longer have access to the app.
      </p>

      <Separator className="my-8" />
      <div className="mt-5 flex flex-wrap gap-4">
        <ResumeButton subscriptionId={lemonSqueezyId} />
      </div>
    </>
  )
}
