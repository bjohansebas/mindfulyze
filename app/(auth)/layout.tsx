import Background from 'components/background'

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
