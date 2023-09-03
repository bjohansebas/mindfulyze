import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

export interface ContentThoughtsProps {
  text: string
  createdAt: Date
}
export function ContentThoughts({ text, createdAt }) {
  return (
    <div className="border-b-stone-200 bg-white flex flex-col border-b shadow-sm rounded-lg">
      <div
        className="overflow-y-auto break-words p-6 py-2 min-h-48 h-48 max-h-56 w-full border-b border-b-stone-200"
        // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        dangerouslySetInnerHTML={{ __html: text }}
      />
      <div className="flex justify-between items-center px-6 py-0">
        <p className="border border-input bg-transparent shadow-sm h-9 px-4 py-2 pl-3 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
          <CalendarIcon className="mr-3 h-4 w-4 opacity-50" />
          {format(new Date(createdAt), 'PPP')}
        </p>
      </div>
    </div>
  )
}
