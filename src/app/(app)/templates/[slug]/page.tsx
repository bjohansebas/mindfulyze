import { getTemplateById } from '@/app/actions/templates'
import EditorTemplate from '@/components/dashboard/templates/editor-template'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  const template = await getTemplateById(params.slug)
  if (template.status !== 200 || template.data == null) {
    notFound()
  }

  return (
    <div className="w-full flex justify-center p-6 h-screen">
      <div className="border w-full flex flex-col rounded-2xl bg-card max-h-full overflow-y-auto">
        <EditorTemplate data={template.data} />
      </div>
    </div>
  )
}
