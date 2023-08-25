import '@/styles/prosemirror.css'

import Background from '@/ui/background'
import Nav from '@/ui/home/nav'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Nav />
      <main>{children}</main>
      <Background />
    </div>
  )
}
