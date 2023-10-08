import { EmailForm } from '@/components/settings/account/email-form'
import { NameForm } from '@/components/settings/account/name-form'
import UploadAvatar from '@/components/settings/account/upload-avatar'

export function AccountForm() {
  return (
    <div className="flex flex-col md:flex-row-reverse gap-8">
      <UploadAvatar />
      <div className="w-full space-y-6">
        <NameForm />
        <EmailForm />
      </div>
    </div>
  )
}
