import { Button } from '@mindfulyze/ui'
import * as Popover from '@radix-ui/react-popover'
import { Editor } from '@tiptap/core'
import { Check, ChevronDown } from 'lucide-react'
import { Dispatch, FC, SetStateAction } from 'react'
import { HIGHLIGHT_COLORS, TEXT_COLORS } from '../../constants'

export interface BubbleColorMenuItem {
  name: string
  color: string
}

interface ColorSelectorProps {
  editor: Editor
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const ColorSelector: FC<ColorSelectorProps> = ({ editor, isOpen, setIsOpen }) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) => editor.isActive('textStyle', { color }))

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) => editor.isActive('highlight', { color }))

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger onClick={() => setIsOpen(!isOpen)} asChild>
          <Button variant="ghost" className="rounded-none px-2 gap-1">
            <span
              className="px-1 rounded-sm"
              style={{
                color: activeColorItem?.color,
                backgroundColor: activeHighlightItem?.color,
              }}
            >
              A
            </span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          align="start"
          className="z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden bg-card overflow-y-auto rounded border p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <div className="my-1 px-2 text-sm">Color</div>
          {TEXT_COLORS.map(({ name, color }, index) => (
            <Button
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              onClick={() => {
                editor.commands.unsetColor()
                name !== 'Default' && editor.chain().focus().setColor(color).run()
                setIsOpen(false)
              }}
              className="justify-between rounded-sm px-2"
              variant="ghost"
            >
              <div className="flex items-center space-x-2">
                <div className="rounded-sm border border-stone-200 px-1 py-px font-medium" style={{ color }}>
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { color }) && <Check className="h-4 w-4" />}
            </Button>
          ))}

          <div className="mb-1 mt-2 px-2 text-sm">Background</div>

          {HIGHLIGHT_COLORS.map(({ name, color }, index) => (
            <Button
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight()
                name !== 'Default' && editor.commands.setHighlight({ color })
                setIsOpen(false)
              }}
              className="justify-between rounded-sm px-2"
              variant="ghost"
            >
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-sm border border-stone-200 px-1 py-px font-medium"
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('highlight', { color }) && <Check className="h-4 w-4" />}
            </Button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  )
}
