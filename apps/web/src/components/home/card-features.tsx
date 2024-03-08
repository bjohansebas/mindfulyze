export const CardFeatures = ({
  title,
  description,
  icon,
}: { title: string; description: string; icon?: JSX.Element }) => {
  return (
    <article className="flex h-full flex-col gap-5 rounded-md border bg-card px-8 py-5 transition-colors hover:border-primary">
      <div className="flex justify-center">{icon}</div>
      <header className="flex w-full flex-col items-center gap-3">
        <h2 className="text-balance text-center font-bold text-emerald-600 text-xl">{title}</h2>
        <p className="mx-auto text-pretty text-center text-md text-muted-foreground">{description}</p>
      </header>
    </article>
  )
}
