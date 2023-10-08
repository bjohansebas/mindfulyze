import Footer from '@/components/ui/home/footer'
import Nav from '@/components/ui/home/nav'
import MobileNav from '@/components/ui/home/nav-mobile'

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
