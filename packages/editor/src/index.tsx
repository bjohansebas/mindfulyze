import './styles/index.css'
import './styles/prosemirror.css'

import { cn } from '@mindfulyze/utils'

import { Editor as EditorClass, FocusPosition } from '@tiptap/core'
import { generateJSON } from '@tiptap/html'
import { EditorContent, useEditor } from '@tiptap/react'

import { useDebouncedCallback } from 'use-debounce'

import { useEffect } from 'react'
import { EditorBubbleMenu } from './components/BubbleMenu'
import { TiptapExtensions } from './extensions'
import { TiptapEditorProps } from './props'

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
  const debouncedUpdates = useDebouncedCallback(async ({ editor }: { editor: EditorClass }) => {
    onDebouncedUpdate(editor)
  }, debounceDuration)

  const editor = useEditor({
    content: generateJSON(text, TiptapExtensions),
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: async (e) => {
      onUpdate(e.editor)

      debouncedUpdates(e)
    },
    autofocus: autofocus,
  })

  useEffect(() => {
    editor?.setEditable(editable || true)
  }, [editable])

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents:
    <div
      onClick={() => {
        editor?.chain().focus().run()
      }}
      className={cn('bg-card relative min-h-[250px] w-full', className)}
    >
      {editor ? <EditorBubbleMenu editor={editor} /> : null}
      <EditorContent editor={editor} />
    </div>
  )
}

export { TiptapExtensions } from './extensions'
export { TiptapEditorProps } from './props'
