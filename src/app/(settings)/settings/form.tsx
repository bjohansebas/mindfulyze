import { EmailForm } from '@/components/settings/account/email-form'
import { NameForm } from '@/components/settings/account/name-form'
import UploadAvatar from '@/components/settings/account/upload-avatar'

export function AccountForm() {
  return (
    <>
      <NameForm />
      <EmailForm />
      <UploadAvatar />
    </>
  )
}
