import Link from 'next/link'
import { OptionsCardTemplate } from './options-card-template'

export interface CardTemplateProps {
  title: string
  id: string
}

export function CardTemplate({ title, id }: CardTemplateProps) {
  return (
    // TODO: Create new  thought
    <div className="font-medium px-6 py-2 w-full bg-card border rounded-lg flex justify-between items-center">
      <Link className="w-full" href={`/templates/${id}`}>
        {title.trim().length === 0 ? 'Untitle' : title}
      </Link>
      <OptionsCardTemplate id={id} />
    </div>
  )
}
