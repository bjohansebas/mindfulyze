import NavigationApp from '@ui/dashboard/menu/navigation'
import { getTemplates } from '../actions/templates'

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const templates = await getTemplates()

  return (
    <div className="flex h-screen flex-col sm:flex-row bg-background w-full">
      <NavigationApp templates={templates.data} />
      <main className="w-full">{children}</main>
    </div>
  )
}
