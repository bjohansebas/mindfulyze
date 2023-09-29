import { TemplateResponse } from '@/app/actions/templates'
import { CardTemplate } from './card-template'
import { EmptyTemplate } from './empty-templates'

interface ListOfTemplatesProps {
  templates: Promise<TemplateResponse>
}

export async function ListOfTemplates({ templates }: ListOfTemplatesProps) {
  const templatesData = await templates

  return (
    <div className="w-full flex flex-col max-h-full overflow-y-auto gap-3 h-full">
      {templatesData.data.length > 0 ? (
        templatesData.data.map(({ id, title }) => <CardTemplate key={id} title={title} id={id} />)
      ) : (
        <EmptyTemplate />
      )}
    </div>
  )
}
