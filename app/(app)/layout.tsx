import '@/styles/prosemirror.css'

import NavigationApp from '@/ui/dashboard/menu/navigation'
import ProviderApp from './provider'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col sm:flex-row bg-background w-full">
      <ProviderApp>
        <NavigationApp />
        <main className="w-full">{children}</main>
      </ProviderApp>
    </div>
  )
}
