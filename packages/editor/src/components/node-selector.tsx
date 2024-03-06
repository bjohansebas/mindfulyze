import { Button, Popover, PopoverContent, PopoverTrigger } from '@mindfulyze/ui'

import {
  Check,
  CheckSquare,
  ChevronDown,
  Code,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  TextIcon,
  TextQuote,
} from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'
import type { FC } from 'react'

import type { SelectorItem } from '../types'

const items: SelectorItem[] = [
  {
    name: 'Text',
    icon: TextIcon,
    command: (editor) => editor?.chain().focus().clearNodes().run(),
    isActive: (editor) =>
      editor != null
        ? editor.isActive('paragraph') && !editor.isActive('bulletList') && !editor.isActive('orderedList')
        : false,
  },
  {
    name: 'Heading 1',
    icon: Heading1,
    command: (editor) => editor?.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => (editor != null ? editor.isActive('heading', { level: 1 }) : false),
  },
  {
    name: 'Heading 2',
    icon: Heading2,
    command: (editor) => editor?.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => (editor != null ? editor.isActive('heading', { level: 2 }) : false),
  },
  {
    name: 'Heading 3',
    icon: Heading3,
    command: (editor) => editor?.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => (editor != null ? editor?.isActive('heading', { level: 3 }) : false),
  },
  {
    name: 'To-do List',
    icon: CheckSquare,
    command: (editor) => editor?.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: (editor) => (editor != null ? editor.isActive('taskItem') : false),
  },
  {
    name: 'Bullet List',
    icon: ListOrdered,
    command: (editor) => editor?.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => (editor != null ? editor.isActive('bulletList') : false),
  },
  {
    name: 'Numbered List',
    icon: ListOrdered,
    command: (editor) => editor?.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => (editor != null ? editor.isActive('orderedList') : false),
  },
  {
    name: 'Quote',
    icon: TextQuote,
    command: (editor) => editor?.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => (editor != null ? editor.isActive('blockquote') : false),
  },
  {
    name: 'Code',
    icon: Code,
    command: (editor) => editor?.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => (editor != null ? editor.isActive('codeBlock') : false),
  },
]

interface NodeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NodeSelector: FC<NodeSelectorProps> = ({ open, onOpenChange }) => {
  const { editor } = useEditor()
  if (!editor) return null

  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: 'Multiple',
    icon: TextIcon,
  }

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild className="gap-2">
        <Button variant="ghost" className="px-2 gap-2 md:w-fit items-center justify-between">
          <div className="flex gap-2 items-center">
            <activeItem.icon className="size-4" />
            <span>{activeItem?.name}</span>
          </div>
          <ChevronDown className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent sideOffset={5} align="start" className="bg-card w-48 p-1 mt-1 border rounded-md">
        {items.map((item) => (
          <EditorBubbleItem
            key={item.name}
            onSelect={(editor) => {
              item.command(editor)
              onOpenChange(false)
            }}
            className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center space-x-2">
              <div className="rounded-sm border-gray-200 border p-1">
                <item.icon className="h-3 w-3" />
              </div>
              <span>{item.name}</span>
            </div>
            {activeItem.name === item.name && <Check className="h-4 w-4" />}
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  )
}
