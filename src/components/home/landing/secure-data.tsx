'use client'

import '@/styles/prosemirror.css'

import { encriptText } from '@/app/actions/home'
import Editor from '@/components/editor'
import { TiptapExtensions } from '@/components/editor/extensions'
import { TiptapEditorProps } from '@/components/editor/props'
import { cn } from '@/lib/utils'
import { CheckIcon } from '@heroicons/react/24/solid'
import { generateJSON } from '@tiptap/html'
import { useEditor } from '@tiptap/react'
import { Button } from '@ui/button'
import { CopyIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export function SecureDataPreview() {
  const [textEncript, setTextEncript] = useState('')

  const debouncedUpdates = useDebouncedCallback(async (text) => {
    try {
      const response = await encriptText(text)
      setTextEncript(response)
    } catch (e) {
      console.log(e)
    }
  }, 1000)

  const editor = useEditor({
    content: generateJSON('', TiptapExtensions),
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: async ({ editor }) => {
      const text = editor.getHTML()

      debouncedUpdates(text)
    },
    autofocus: 'end',
  })

  return (
    <div className="mx-auto  px-4 sm:px-6 md:px-8 w-4/6 max-w-[66%]">
      <div className="shadow-xl h-[31.625rem] max-h-[calc(60vh+58px)] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] bg-card/70 backdrop-blur ring-1 ring-inset ring-primary-900">
        <div className="relative w-full flex flex-col">
          <div className="flex-none border-b border-slate-500/30">
            <div className="flex items-center h-8 space-x-1.5 px-3">
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
              <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
            </div>
          </div>
          <Editor editor={editor} className="h-[calc(60vh-32px)]" />
          <pre className="relative overflow-x-auto px-2  py-4">
            <code className="rounded py-[0.2rem] text-sm">{textEncript}</code>
            <CopyButton value={textEncript} className={cn('absolute right-4 top-4')} />
          </pre>
        </div>
      </div>
    </div>
  )
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value)
  if (event) {
    // trackEvent(event)
  }
}

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false)
    }, 2000)
  }, [hasCopied])

  return (
    <Button
      size="icon"
      className={cn('relative z-10 h-6 w-6', className)}
      onClick={() => {
        copyToClipboardWithMeta(value)
        setHasCopied(true)
      }}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <CheckIcon className="h-3 w-3" /> : <CopyIcon className="h-3 w-3" />}
    </Button>
  )
}
