'use client'

import useLocalStorage from '@/lib/hooks/useLocalStorage'
import { EditorContent, useEditor } from '@tiptap/react'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { EditorBubbleMenu } from './components/bubble-menu'
import { TiptapExtensions } from './extensions'
import { TiptapEditorProps } from './props'

export default function Editor() {
  const [content, setContent] = useLocalStorage('content', {})

  const [hydrated, setHydrated] = useState(false)

  const debouncedUpdates = useDebouncedCallback(async ({ editor }) => {
    const json = editor.getJSON()
    setContent(json)
  }, 250)

  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: (e) => {
      debouncedUpdates(e)
    },
    autofocus: 'end',
  })

  // Hydrate the editor with the content from localStorage.
  useEffect(() => {
    if (editor && content && !hydrated) {
      editor.commands.setContent(content)
      setHydrated(true)
    }
  }, [editor, content, hydrated])

  return (
    // rome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <div
      onClick={() => {
        editor?.chain().focus().run()
      }}
      className='
      overflow-y-auto overflow-hidden relative min-h-48 h-48 w-full max-w-screen-sm max-h-56 border-stone-200 bg-white p-6 sm:mb-[calc(20vh)] sm:rounded-lg sm:border sm:px-6 sm:shadow-lg'
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  )
}
