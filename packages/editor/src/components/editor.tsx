import { cn } from '@mindfulyze/utils'

import type { Editor as EditorClass, FocusPosition } from '@tiptap/core'

import { useDebouncedCallback } from 'use-debounce'

import { generateJSON } from '@tiptap/html'
import { EditorBubble, EditorContent, EditorRoot } from 'novel'
import { useState } from 'react'

import { TiptapExtensions } from '../extensions'
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
        autofocus={autofocus}
        initialContent={generateJSON(text, TiptapExtensions)}
        extensions={TiptapExtensions}
        className={cn('bg-card relative min-h-[250px] w-full', className)}
        editorProps={defaultEditorProps}
        onUpdate={({ editor }) => {
          onUpdate(editor)
          debouncedUpdates({ editor })
        }}
      >
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
