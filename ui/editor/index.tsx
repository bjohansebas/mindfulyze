'use client'

import { cn } from '@/lib/utils'
import { EditorContent, EditorContentProps } from '@tiptap/react'
import { Dispatch, SetStateAction } from 'react'
import { EditorBubbleMenu } from './components/bubble-menu'

export interface EditorProps {
  onChange: Dispatch<SetStateAction<object>>
  className?: string
}

export default function Editor({ editor, className }: EditorContentProps) {
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => {
        editor?.chain().focus().run()
      }}
      className={cn('overflow-y-scroll relative min-h-48 h-full w-full p-6 border-b', className)}
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
