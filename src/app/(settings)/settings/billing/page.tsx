import { constructMetadata } from '@/lib/metadata'

import { ShowSubscriptionCard } from '@/components/billing/show-subscription'
import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'

export const metadata = constructMetadata({
  title: 'Billing settings | Mindfulyze',
})

export default function Pard() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Manage or change your subscription and modify your payment method.
        </p>
      </div>
      <Separator />
      <div className="bg-card p-8 rounded-xl">
        <h4 className="text-lg font-medium mb-2">Plan</h4>
        <Suspense fallback={<div>loading</div>}>
          <ShowSubscriptionCard />
        </Suspense>
      </div>
    </div>
  )
}
