import { getUserSubscription } from '@/app/actions/user'
import { formatDate } from '@/lib/utils'
import { ActiveSubscriptionCard } from './status/active-subscription'

export async function ShowSubscriptionCard() {
  const getSubscription = await getUserSubscription()

  if (getSubscription.data?.status === 'active') {
    return (
      <ActiveSubscriptionCard
        frequency={getSubscription.data.frequency}
        renewsAt={getSubscription.data.renewsAt?.toDateString() || ''}
        subscriptionPlan={getSubscription.data.subscriptionPlan}
      />
    )
  }
}
