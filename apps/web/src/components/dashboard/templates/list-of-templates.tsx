import { getTemplates } from '@/app/actions/templates'
import { CardTemplate } from './card-template'
import { EmptyTemplate } from './empty-templates'

export async function ListOfTemplates() {
  const templatesData = await getTemplates()

  return (
    <div className="flex h-full max-h-full w-full flex-col gap-3 overflow-y-auto">
      {templatesData.data.length > 0 ? (
        templatesData.data.map(({ id, title }) => <CardTemplate key={id} title={title} id={id} />)
      ) : (
        <EmptyTemplate />
      )}
    </div>
  )
}
