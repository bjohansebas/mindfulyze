import { Separator } from '@mindfulyze/ui'
import { constructMetadata } from '@mindfulyze/utils'

import { AccountForm } from '@/app/(settings)/settings/form'

export const metadata = constructMetadata({
  title: 'Account settings | Mindfulyze',
})

export default function Password() {
  return (
    <div className="w-full space-y-6">
      <div>
        <h3 className="font-medium text-lg">Account</h3>
        <p className="text-muted-foreground text-sm">Update your account settings.</p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
