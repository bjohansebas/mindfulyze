import { TEXT_COLORS } from '@editor/constants'

import { Button } from '@mindfulyze/ui'

import * as Popover from '@radix-ui/react-popover'
import type { Editor } from '@tiptap/core'
import { BaselineIcon, Check } from 'lucide-react'
import type { Dispatch, FC, SetStateAction } from 'react'

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

  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger onClick={() => setIsOpen(!isOpen)} asChild>
          <Button variant="ghost" className="px-2">
            <BaselineIcon
              className="w-5 h-5"
              style={{
                color: activeColorItem?.color,
              }}
            />
          </Button>
        </Popover.Trigger>
        <Popover.Content
          align="start"
          className="z-[99999] my-1 flex max-h-80 w-48 flex-col overflow-hidden bg-card overflow-y-auto rounded border p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
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
                <div className="rounded-sm border px-1 py-px font-medium" style={{ color }}>
                  A
                </div>
                <span>{name}</span>
              </div>
              {editor.isActive('textStyle', { color }) && <Check className="h-4 w-4" />}
            </Button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  )
}
