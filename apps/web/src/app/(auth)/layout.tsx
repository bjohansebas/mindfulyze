export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="-z-10 fixed top-0 left-0 h-svh w-full">
        <div className="relative h-svh w-full bg-background">
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_500px_at_50%_200px,#22282f,transparent)]" />
        </div>
      </div>
      {children}
    </main>
  )
}
