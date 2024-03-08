import { DeleteAccountForm } from '@/components/settings/account/delete-account-form'
import { EmailForm } from '@/components/settings/account/email-form'
import { NameForm } from '@/components/settings/account/name-form'
import UploadAvatar from '@/components/settings/account/upload-avatar'

export function AccountForm() {
  return (
    <div className="flex flex-col gap-8 md:flex-row-reverse">
      <UploadAvatar />
      <div className="w-full space-y-6">
        <NameForm />
        <EmailForm />
        <DeleteAccountForm />
      </div>
    </div>
  )
}
