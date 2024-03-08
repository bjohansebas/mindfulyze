import Navigation from '@ui/home/nav'
import Footer from '@ui/shared/footer'

export default function MindfulyzeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(119,198,183,0.3),rgba(255,255,255,0))] bg-background" />
      <Navigation />
      {children}
      <Footer />
    </>
  )
}
