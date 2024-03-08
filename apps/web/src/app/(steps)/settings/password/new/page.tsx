import { constructMetadata } from '@mindfulyze/utils'

import { getUser } from '@/app/actions/user'
import { LockIcon } from 'lucide-react'
import { redirect } from 'next/navigation'
import { NewPasswordForm } from './form'

export const metadata = constructMetadata({
  title: 'Password | Mindfulyze',
})

export default async function NewPasswordSettingsPage() {
  const user = await getUser()

  if (user.data?.password) {
    redirect('/settings/password')
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="z-10 h-fit w-full max-w-md overflow-hidden rounded-2xl border bg-card sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 px-4 py-3 pt-8 text-center sm:px-16">
          <LockIcon className="h-10 w-10" />
          <h3 className="font-semibold text-xl">Safe password</h3>
          <p className="text-sm">Before we begin, first create a password to keep all your thoughts secure.</p>
        </div>
        <div className="flex flex-col space-y-3 px-4 pt-3 pb-8 sm:px-16">
          <NewPasswordForm />
        </div>
      </div>
    </div>
  )
}
