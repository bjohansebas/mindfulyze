import { BubbleMenu, BubbleMenuProps } from '@tiptap/react'
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react'
import { FC, useState } from 'react'

import { cn } from '@/lib/utils'
import { Editor } from '@tiptap/core'
import { ColorSelector } from './color-selector'
import { LinkSelector } from './link-selector'
import { NodeSelector } from './node-selector'

export interface BubbleMenuItem {
  name: string
  isActive: () => boolean
  command: () => void
  icon: typeof BoldIcon
}

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>

export const EditorBubbleMenu: FC<EditorBubbleMenuProps & { editor: Editor }> = (props) => {
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => props?.editor.isActive('bold'),
      command: () => props?.editor.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => props.editor.isActive('italic'),
      command: () => props.editor.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => props.editor.isActive('underline'),
      command: () => props.editor.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: () => props.editor.isActive('strike'),
      command: () => props.editor.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'code',
      isActive: () => props.editor.isActive('code'),
      command: () => props.editor.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ]

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: ({ editor }) => {
      return editor.view.state.selection.content().size > 0
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => {
        setIsNodeSelectorOpen(false)
        setIsColorSelectorOpen(false)
        setIsLinkSelectorOpen(false)
      },
    },
  }

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false)
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false)
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false)

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className='flex w-fit divide-x divide-stone-200 rounded border border-stone-200 bg-white shadow-xl'
    >
      <NodeSelector
        editor={props.editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen)
          setIsColorSelectorOpen(false)
          setIsLinkSelectorOpen(false)
        }}
      />
      <LinkSelector
        editor={props.editor}
        isOpen={isLinkSelectorOpen}
        setIsOpen={() => {
          setIsLinkSelectorOpen(!isLinkSelectorOpen)
          setIsColorSelectorOpen(false)
          setIsNodeSelectorOpen(false)
        }}
      />
      <div className='flex'>
        {items.map((item, index) => (
          <button
            type='button'
            // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            onClick={item.command}
            className='p-2 text-stone-600 hover:bg-stone-100 active:bg-stone-200'
          >
            <item.icon
              className={cn('h-4 w-4', {
                'text-blue-500': item.isActive(),
              })}
            />
          </button>
        ))}
      </div>
      <ColorSelector
        editor={props.editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen)
          setIsNodeSelectorOpen(false)
          setIsLinkSelectorOpen(false)
        }}
      />
    </BubbleMenu>
  )
}
