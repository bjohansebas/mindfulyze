import EditorTemplatesPlaceholder from '@ui/dashboard/templates/placeholder-editor-templates'

export default function Loading() {
  return (
    <div className="flex h-screen w-full justify-center p-6">
      <div className="flex max-h-full w-full flex-col overflow-y-auto rounded-2xl border bg-card">
        <EditorTemplatesPlaceholder />
      </div>
    </div>
  )
}
