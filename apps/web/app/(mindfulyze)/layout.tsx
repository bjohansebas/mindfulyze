import Background from '@/components/background'
import Footer from '@/components/home/footer'
import Nav from '@/components/home/nav'
import MobileNav from '@/components/home/nav-mobile'

export default function MindfulyzeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <MobileNav />
      <Nav />
      <main>{children}</main>
      <Footer />
      <Background />
    </div>
  )
}
