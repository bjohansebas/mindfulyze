import { constructMetadata } from '@mindfulyze/utils'
import { PasswordForm } from './form'

import { Skeleton } from '@mindfulyze/ui'
import { Suspense } from 'react'

export const metadata = constructMetadata({
  title: 'Password | Mindfulyze',
})

export default function PasswordSettingsPage() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <Suspense fallback={<Skeleton className="h-[488px] max-w-md w-full bg-card" />}>
        <PasswordForm />
      </Suspense>
    </div>
  )
}
