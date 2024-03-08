import '../styles/index.css'
import '../styles/prosemirror.css'

import { cn } from '@mindfulyze/utils'

import type { Editor as EditorClass, FocusPosition } from '@tiptap/core'

import { useDebouncedCallback } from 'use-debounce'

import { generateJSON } from '@tiptap/html'
import { EditorBubble, EditorCommand, EditorCommandEmpty, EditorCommandItem, EditorContent, EditorRoot } from 'novel'
import { useState } from 'react'

import { extensions } from '../extensions'
import { suggestionItems } from '../extensions/slash-command'
import { BackgroundSelector } from './background-selector'
import { ColorSelector } from './color-selector'
import { NodeSelector } from './node-selector'
import { defaultEditorProps } from './props'
import { TextSelectors } from './text-selector'

export interface EditorProps {
  /**
   * The default value to use for the editor.
   * ""
   */
  text?: string
  /**
   * A callback function that is called whenever the editor is updated.
   * Defaults to () => {}.
   */
  onUpdate?: (editor?: EditorClass) => void | Promise<void>
  /**
   * A callback function that is called whenever the editor is updated, but only after the defined debounce duration.
   * Defaults to () => {}.
   */
  onDebouncedUpdate?: (editor?: EditorClass) => void | Promise<void>
  /**
   * The duration (in milliseconds) to debounce the onDebouncedUpdate callback.
   * Defaults to 750.
   */
  debounceDuration?: number
  /**
   * Additional classes to add to the editor container.
   */
  className?: string
  autofocus?: FocusPosition
  editable?: boolean
}

export function Editor({
  text = '',
  className,
  debounceDuration = 750,
  autofocus = 'end',
  onUpdate = () => {},
  onDebouncedUpdate = () => {},
  editable,
}: EditorProps) {
  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openBackground, setOpenBackground] = useState(false)

  const debouncedUpdates = useDebouncedCallback(async ({ editor }: { editor: EditorClass }) => {
    onDebouncedUpdate(editor)
  }, debounceDuration)

  return (
    <EditorRoot>
      <EditorContent
        editable={editable}
        autofocus={autofocus}
        initialContent={generateJSON(text, extensions)}
        extensions={extensions}
        className={cn('bg-card relative min-h-[250px] w-full', className)}
        editorProps={defaultEditorProps}
        onUpdate={({ editor }) => {
          onUpdate(editor)
          debouncedUpdates({ editor })
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
          {suggestionItems.map((item) => (
            <EditorCommandItem
              value={item.title}
              onCommand={(val) => (item.command != null ? item.command(val) : null)}
              className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent "
              key={item.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                {item.icon}
              </div>
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            </EditorCommandItem>
          ))}
        </EditorCommand>
        <EditorBubble
          tippyOptions={{
            placement: 'top',
          }}
          className="bg-card flex w-fit p-1 rounded border gap-1 max-w-[90vw] overflow-x-auto shadow-xl"
        >
          <NodeSelector open={openNode} onOpenChange={setOpenNode} />
          <TextSelectors />
          <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          <BackgroundSelector open={openBackground} onOpenChange={setOpenBackground} />
        </EditorBubble>
      </EditorContent>
    </EditorRoot>
  )
}
