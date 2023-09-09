'use client'

import { EditorContent, EditorContentProps } from '@tiptap/react'
import { Dispatch, SetStateAction } from 'react'
import { EditorBubbleMenu } from './components/bubble-menu'
import { cn } from '@/lib/utils'

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
      className={cn("overflow-y-auto overflow-hidden relative min-h-48 h-full max-h-[calc(70vh)] w-full min-w-[300px] border-b-stone-200 bg-white p-6 border-b", className)}
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div >
  )
}
