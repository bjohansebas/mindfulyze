import Footer from '@/ui/home/footer'
import Nav from '@/ui/home/nav'
import MobileNav from '@/ui/home/nav-mobile'

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
    </div>
  )
}
