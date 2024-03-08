import { getTemplateById } from '@/app/actions/templates'
import EditorTemplate from '@/components/dashboard/templates/editor-template'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  const template = await getTemplateById(params.slug)

  if (template.status !== 200 || template.data == null) {
    notFound()
  }

  return (
    <div className="flex h-screen w-full justify-center p-6">
      <div className="flex max-h-full w-full flex-col overflow-y-auto rounded-2xl border bg-card">
        <EditorTemplate data={template.data} />
      </div>
    </div>
  )
}
