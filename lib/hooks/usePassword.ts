import { useSession } from 'next-auth/react'

export default function usePassword() {
  const { data: session, update } = useSession()

  const password = session?.user?.pw

  const updatePassword = async (newPassword: string): Promise<void> => {
    await update({ pw: newPassword })
  }

  return {
    password,
    updatePassword,
  }
}
