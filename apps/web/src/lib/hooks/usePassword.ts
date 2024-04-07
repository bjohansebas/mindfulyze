import type { Session } from 'next-auth'
import { useSession } from 'next-auth/react'

export default function usePassword() {
  const { update } = useSession()

  const updatePassword = async (newPassword: string): Promise<Session | null> => {
    return await update({ pw: newPassword })
  }

  return {
    updatePassword,
  }
}
