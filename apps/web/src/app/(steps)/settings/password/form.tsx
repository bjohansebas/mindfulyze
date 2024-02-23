import { getUser } from '@/app/actions/user'
import { NewPasswordForm } from '@ui/settings/password/newPasswordForm'
import { SetPasswordForm } from '@ui/settings/password/setPasswordForm'
import { LockIcon } from 'lucide-react'

export async function PasswordForm() {
  const user = await getUser()

  return (
    <div className="z-10 h-fit w-full max-w-md overflow-hidden border rounded-2xl sm:shadow-xl bg-card">
      <div className="flex flex-col items-center justify-center space-y-3 px-4 py-3 pt-8 text-center sm:px-16">
        <LockIcon className="h-10 w-10" />
        <h3 className="text-xl font-semibold">
          {user.data?.password != null ? 'Unlock your thoughts' : 'Safe password'}
        </h3>
        <p className="text-sm">
          {user.data?.password != null
            ? 'Please enter the password to unlock your thoughts.'
            : 'Before we begin, first create a password to keep all your thoughts secure.'}
        </p>
      </div>
      <div className="flex flex-col space-y-3 px-4 pb-8 pt-3 sm:px-16">
        {user.data?.password == null ? <SetPasswordForm /> : <NewPasswordForm />}
      </div>
    </div>
  )
}
