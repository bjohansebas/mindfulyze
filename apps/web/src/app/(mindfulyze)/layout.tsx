import Footer from '@/components/home/footer'
import Navigation from '@ui/home/nav'

export default function MindfulyzeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,198,183,0.3),rgba(255,255,255,0))]" />
      <Navigation />
      <main className="pt-3">{children}</main>
      <Footer />
    </>
  )
}
