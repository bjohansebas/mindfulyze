import { Button } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'

import type { SelectorItem } from '../types'

const items: SelectorItem[] = [
  {
    name: 'bold',
    isActive: (editor) => editor.isActive('bold'),
    command: (editor) => editor.chain().focus().toggleBold().run(),
    icon: BoldIcon,
  },
  {
    name: 'italic',
    isActive: (editor) => editor.isActive('italic'),
    command: (editor) => editor?.chain().focus().toggleItalic().run(),
    icon: ItalicIcon,
  },
  {
    name: 'underline',
    isActive: (editor) => editor.isActive('underline'),
    command: (editor) => editor?.chain().focus().toggleUnderline().run(),
    icon: UnderlineIcon,
  },
  {
    name: 'strike',
    isActive: (editor) => editor.isActive('strike'),
    command: (editor) => editor.chain().focus().toggleStrike().run(),
    icon: StrikethroughIcon,
  },
  {
    name: 'code',
    isActive: (editor) => editor.isActive('code'),
    command: (editor) => editor.chain().focus().toggleCode().run(),
    icon: CodeIcon,
  },
]

export const TextSelectors = () => {
  const { editor } = useEditor()
  if (!editor) return null

  return (
    <div className="flex">
      {items.map((item) => (
        <EditorBubbleItem
          key={item.name}
          onSelect={(editor) => {
            item.command(editor)
          }}
        >
          <Button className="px-2" variant="ghost">
            <item.icon
              className={cn('h-5 w-5', {
                'text-primary': item.isActive(editor),
              })}
            />
          </Button>
        </EditorBubbleItem>
      ))}
    </div>
  )
}
