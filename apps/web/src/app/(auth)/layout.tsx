import Background from '@/components/background'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in to Mindfulyze',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className='flex h-screen w-screen justify-center items-center'>
      <Background />
      {children}
    </main>
  )
}
