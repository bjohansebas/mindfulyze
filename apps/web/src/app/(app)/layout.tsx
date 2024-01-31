import NavigationApp from '@ui/app/navigation'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col w-full">
      <NavigationApp />
      <main className="w-full">{children}</main>
    </div>
  )
}
