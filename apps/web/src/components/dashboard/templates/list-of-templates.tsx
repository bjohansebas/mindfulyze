import { getTemplates } from '@/app/actions/templates'
import { CardTemplate } from './card-template'
import { EmptyTemplate } from './empty-templates'

export async function ListOfTemplates() {
  const templatesData = await getTemplates()

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
