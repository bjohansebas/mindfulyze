import '@/styles/prosemirror.css'

import Background from '@/ui/background'
import NavigationApp from '@/ui/dashboard/navigation'
import ProviderApp from './provider'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavigationApp />
      <ProviderApp>
        <main>{children}</main>
      </ProviderApp>
      <Background />
    </div>
  )
}
