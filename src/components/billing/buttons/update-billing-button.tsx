import { Button } from '@ui/button'
import Link from 'next/link'
import { getSubscription } from '../actions/subscription'

export async function UpdateBillingButton({ subscriptionId }: { subscriptionId: number }) {
  const res = await getSubscription(subscriptionId)

  if (res.data == null) {
    return <Button className="ghost">d</Button>
  }

  return (
    <Button asChild variant="outline">
      <Link href={res.data?.subscription.update_billing_url}>Update your payment method</Link>
    </Button>
  )
}
