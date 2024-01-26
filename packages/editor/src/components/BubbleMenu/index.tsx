import { BubbleMenu, BubbleMenuProps, Editor, isNodeSelection } from '@tiptap/react'
import { BoldIcon, CodeIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from 'lucide-react'
import { FC, useState } from 'react'

// import { ColorSelector } from './color-selector'
// import { NodeSelector } from './node-selector'

import { ColorSelector } from '@editor/components/ColorSelector'
import { Button } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'
import { BackgroundSelector } from '../BackgroundSelector'
import { NodeSelector } from '../NodeSelector'

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
      isActive: () => props.editor.isActive('bold'),
      command: () => props.editor.chain().focus().toggleBold().run(),
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
    shouldShow: ({ state, editor }) => {
      const { selection } = state
      const { empty } = selection

      // don't show bubble menu if:
      // - the selected node is an image
      // - the selection is empty
      // - the selection is a node selection (for drag handles)
      if (editor.isActive('image') || empty || isNodeSelection(selection)) {
        return false
      }
      return true
    },
    tippyOptions: {
      moveTransition: 'transform 0.15s ease-out',
      onHidden: () => {
        setIsNodeSelectorOpen(false)
        setIsColorSelectorOpen(false)
        setIsBackgroundSelectorOpen(false)
        // setIsLinkSelectorOpen(false)
      },
    },
  }

  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false)
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false)
  const [isBackgroundSelectorOpen, setIsBackgroundSelectorOpen] = useState(false)
  //   const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false)

  return (
    <BubbleMenu
      {...bubbleMenuProps}
      className="bg-card flex w-fit p-1 rounded border gap-1 max-w-[97vw] overflow-x-auto"
    >
      <NodeSelector
        editor={props.editor}
        isOpen={isNodeSelectorOpen}
        setIsOpen={() => {
          setIsNodeSelectorOpen(!isNodeSelectorOpen)
          setIsColorSelectorOpen(false)
          setIsBackgroundSelectorOpen(false)
          //   setIsLinkSelectorOpen(false)
        }}
      />

      <div className="flex">
        {items.map((item) => (
          <Button variant="ghost" key={item.name} onClick={item.command} className="px-2">
            <item.icon
              className={cn('h-5 w-5', {
                'text-primary': item.isActive(),
              })}
            />
          </Button>
        ))}
      </div>
      <ColorSelector
        editor={props.editor}
        isOpen={isColorSelectorOpen}
        setIsOpen={() => {
          setIsColorSelectorOpen(!isColorSelectorOpen)
          setIsNodeSelectorOpen(false)
          setIsBackgroundSelectorOpen(false)
          //   setIsLinkSelectorOpen(false)
        }}
      />
      <BackgroundSelector
        editor={props.editor}
        isOpen={isBackgroundSelectorOpen}
        setIsOpen={() => {
          setIsBackgroundSelectorOpen(!isBackgroundSelectorOpen)
          setIsColorSelectorOpen(false)
          setIsNodeSelectorOpen(false)
          //   setIsLinkSelectorOpen(false)
        }}
      />
    </BubbleMenu>
  )
}
