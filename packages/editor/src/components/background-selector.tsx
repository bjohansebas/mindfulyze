import { Button, Popover, PopoverContent, PopoverTrigger } from '@mindfulyze/ui'

import { Check, HighlighterIcon } from 'lucide-react'
import { EditorBubbleItem, useEditor } from 'novel'
import type { FC } from 'react'

import { HIGHLIGHT_COLORS } from '../constants'

interface BackgroundSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const BackgroundSelector: FC<BackgroundSelectorProps> = ({ open, onOpenChange }) => {
  const { editor } = useEditor()

  if (!editor) return null

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) => editor.isActive('highlight', { color }))

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="px-2"
          style={{
            backgroundColor: activeHighlightItem?.color,
          }}
        >
          <HighlighterIcon className="w-5 h-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        align="start"
        className="my-1 flex max-h-80 w-48 flex-col overflow-hidden bg-card overflow-y-auto rounded border p-1 shadow-xl"
      >
        {HIGHLIGHT_COLORS.map(({ name, color }) => (
          <EditorBubbleItem
            key={name}
            onSelect={() => {
              editor.commands.unsetHighlight()
              name !== 'Default' && editor.commands.setHighlight({ color })
            }}
            className="flex cursor-pointer items-center justify-between rounded-sm px-2 py-1 text-sm hover:bg-accent"
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
          </EditorBubbleItem>
        ))}
      </PopoverContent>
    </Popover>
  )
}
