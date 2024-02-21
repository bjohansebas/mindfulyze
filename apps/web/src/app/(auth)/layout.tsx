export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-screen w-screen justify-center items-center">
      <div className="fixed left-0 top-0 -z-10 h-svh w-full">
        <div className="relative h-svh w-full bg-background">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#22282f,transparent)]" />
        </div>
      </div>
      {children}
    </main>
  )
}
