import '../styles/index.css'
import '../styles/prosemirror.css'

import { cn } from '@mindfulyze/utils'

import type { Editor as EditorClass, FocusPosition } from '@tiptap/core'

import { useDebouncedCallback } from 'use-debounce'

import { generateJSON } from '@tiptap/html'
import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
} from 'novel'
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
}

export function Editor({
  text = '',
  className,
  debounceDuration = 750,
  autofocus = 'end',
  onUpdate = () => {},
  onDebouncedUpdate = () => {},
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
        autofocus={autofocus}
        initialContent={generateJSON(text, extensions)}
        extensions={extensions}
        className={cn('relative min-h-[250px] w-full bg-card', className)}
        editorProps={defaultEditorProps}
        onUpdate={({ editor }) => {
          onUpdate(editor)
          debouncedUpdates({ editor })
        }}
      >
        <EditorCommand className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
          <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => (item.command != null ? item.command(val) : null)}
                className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm aria-selected:bg-accent hover:bg-accent"
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-muted-foreground text-xs">{item.description}</p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>
        <EditorBubble
          tippyOptions={{
            placement: 'top',
          }}
          className="flex w-fit max-w-[90vw] gap-1 overflow-x-auto rounded border bg-card p-1 shadow-xl"
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
