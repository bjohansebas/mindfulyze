import { Button } from '@mindfulyze/ui'

import { Popover, PopoverContent, PopoverTrigger } from '@mindfulyze/ui'
import { BaselineIcon, Check } from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'
import type { FC } from 'react'
import { TEXT_COLORS } from '../constants'

interface ColorSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ColorSelector: FC<ColorSelectorProps> = ({ open, onOpenChange }) => {
  const { editor } = useEditor()

  if (!editor) return null

  const activeColorItem = TEXT_COLORS.find(({ color }) => editor.isActive('textStyle', { color }))

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="px-2">
          <BaselineIcon
            className="h-5 w-5"
            style={{
              color: activeColorItem?.color,
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        align="start"
        className="fade-in slide-in-from-top-1 my-1 flex max-h-80 w-48 animate-in flex-col overflow-hidden overflow-y-auto rounded border bg-card p-1 shadow-xl"
      >
        {TEXT_COLORS.map(({ name, color }) => (
          <EditorBubbleItem
            key={name}
            onSelect={() => {
              editor.commands.unsetColor()
              name !== 'Default' &&
                editor
                  .chain()
                  .focus()
                  .setColor(color || '')
                  .run()
            }}
            className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
          >
            <div className="flex items-center space-x-2">
              <div className="rounded-sm border px-2 py-px font-medium" style={{ color }}>
                A
              </div>
              <span>{name}</span>
            </div>
            {editor.isActive('textStyle', { color }) && <Check className="h-4 w-4" />}
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  )
}
