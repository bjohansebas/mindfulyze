import EditorTemplatesPlaceholder from '@/ui/dashboard/templates/placeholder-editor-templates'

export default function Loading() {
  return (
    <div className="w-full flex justify-center p-6 h-screen">
      <div className="border w-full flex flex-col rounded-2xl bg-card max-h-full overflow-y-auto">
        <EditorTemplatesPlaceholder />
      </div>
    </div>
  )
}
