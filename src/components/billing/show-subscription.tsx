import { getPlans } from '@/app/(mindfulyze)/pricing/getPlans'
import { getUserSubscription } from '@/app/actions/user'
import { CardsPricing } from '../pricing/cards-pricing'
import { ActiveSubscriptionCard } from './status/active-subscription'
import { CancelledSubscriptionCard } from './status/cancelled-subscription'

export async function ShowSubscriptionCard() {
  const getSubscription = await getUserSubscription()
  const plans = await getPlans()

  if (getSubscription.data?.status === 'active') {
    return (
      <ActiveSubscriptionCard
        lemonSqueezyId={getSubscription.data.lemonSqueezyId as number}
        frequency={getSubscription.data.frequency}
        renewsAt={getSubscription.data.renewsAt?.toDateString() || ''}
        subscriptionPlan={getSubscription.data.subscriptionPlan}
      />
    )
  } else if (getSubscription.data?.status === 'cancelled') {
    return (
      <CancelledSubscriptionCard
        endsAt={getSubscription.data.endsAt?.toDateString() || ''}
        lemonSqueezyId={getSubscription.data.lemonSqueezyId as number}
        frequency={getSubscription.data.frequency}
        subscriptionPlan={getSubscription.data.subscriptionPlan}
      />
    )
  } else {
    return <CardsPricing pricingItems={plans} />
  }
}
