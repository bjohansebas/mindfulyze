import Background from '@/components/background'

export default function PasswordLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main>{children}</main>
      <Background />
    </div>
  )
}
