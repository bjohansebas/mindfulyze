import './styles/index.css'
import './styles/prosemirror.css'

import { cn } from '@mindfulyze/utils'
import { EditorContent, EditorContentProps } from '@tiptap/react'
import { Dispatch, SetStateAction } from 'react'
import { EditorBubbleMenu } from './components/BubbleMenu'

export interface EditorProps {
  onChange: Dispatch<SetStateAction<object>>
  className?: string
}

export function Editor({ editor, className }: EditorContentProps) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => {
        editor?.chain().focus().run()
      }}
      className={cn('overflow-y-scroll relative min-h-48 h-full w-full p-6 border-b', className)}
    >
      {editor ? <EditorBubbleMenu editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  )
}

export { TiptapExtensions } from './extensions'
export { TiptapEditorProps } from './props'
