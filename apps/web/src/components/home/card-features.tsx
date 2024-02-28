export const CardFeatures = ({
  title,
  description,
  icon,
}: { title: string; description: string; icon?: JSX.Element }) => {
  return (
    <article className="h-full flex border gap-5 flex-col py-5 px-8 bg-card rounded-md hover:border-primary transition-colors">
      <div className="flex justify-center">{icon}</div>
      <header className="flex flex-col gap-3 items-center  w-full">
        <h2 className="text-center text-xl font-bold text-emerald-600 text-balance">{title}</h2>
        <p className="text-center text-muted-foreground mx-auto text-md text-pretty">{description}</p>
      </header>
    </article>
  )
}
