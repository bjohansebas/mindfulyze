import { TemplateResponse } from '@/app/actions/templates'
import { CardTemplate } from './card-template'

interface ListOfTemplatesProps {
  templates: Promise<TemplateResponse>
}

export async function ListOfTemplates({ templates }: ListOfTemplatesProps) {
  const templatesData = await templates

  return (
    <div className="w-full flex flex-col max-h-full overflow-y-auto gap-3">
      {templatesData.data.length > 0
        ? templatesData.data.map(({ id, title }) => <CardTemplate key={id} title={title} id={id} />)
        : // <ThoughtsEmpty />
          null}
    </div>
  )
}
