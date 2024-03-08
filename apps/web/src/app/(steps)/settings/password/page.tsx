import { getUser } from '@/app/actions/user'
import { constructMetadata } from '@mindfulyze/utils'
import { SetPasswordForm } from './form'

import { LockIcon } from 'lucide-react'
import { redirect } from 'next/navigation'

export const metadata = constructMetadata({
  title: 'Password | Mindfulyze',
})

export default async function SetPasswordSettingsPage() {
  const user = await getUser()

  if (!user.data?.password) {
    redirect('/settings/password/new')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 h-fit w-full max-w-md overflow-hidden rounded-2xl border bg-card sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-3 pt-8 text-center sm:px-16">
          <LockIcon className="h-10 w-10" />
          <h3 className="font-semibold text-xl">Unlock your thoughts</h3>
          <p className="text-sm">Please enter the password to unlock your thoughts.</p>
        </div>
        <div className="flex flex-col space-y-3 px-4 pt-3 pb-8 sm:px-16">
          <SetPasswordForm />
        </div>
      </div>
    </div>
  )
}
