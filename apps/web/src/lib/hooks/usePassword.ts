import { useSession } from 'next-auth/react'

export default function usePassword() {
  const { update } = useSession()

  const updatePassword = async (newPassword: string): Promise<void> => {
    await update({ pw: newPassword })
  }

  return {
    updatePassword,
  }
}
