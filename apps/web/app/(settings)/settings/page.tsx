import { constructMetadata } from '@mindfulyze/utils'

import { Separator } from '@/components/ui/separator'
import { AccountForm } from 'app/(settings)/settings/form'

export const metadata = constructMetadata({
  title: 'Account settings | Mindfulyze',
})

export default function Password() {
  return (
    <div className="space-y-6 w-full">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">Update your account settings.</p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}
