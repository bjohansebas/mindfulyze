import { LayoutTemplateIcon } from 'lucide-react'

const Templates = () => {
  return (
    <div className="gap-4 mx-auto max-w-lg px-4 text-center sm:max-w-4xl flex justify-between items-center pb-16 pt-8 flex-col-reverse sm:flex-row">
      <div className="max-w-md gap-3 flex flex-col">
        <h2 className="font-display text-xl font-bold leading-[1.15] text-primary-600 sm:text-6xl sm:leading-[1.15]">
          Journal Templates
        </h2>
        <p>
          With the help of templates, you will have the ease of starting to write a journal and reflect on the things
          that matter most.
        </p>
      </div>
      <div>
        <LayoutTemplateIcon className="sm:w-48 sm:h-48 w-32 h-32" />
      </div>
    </div>
  )
}

export default Templates
