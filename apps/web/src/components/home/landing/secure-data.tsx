'use client'

import { encriptText } from '@/app/actions/home'
import { Editor } from '@mindfulyze/editor'

import { CheckIcon } from '@heroicons/react/24/solid'
import { cn } from '@mindfulyze/utils'

import { Button } from '@ui/button'
import { CopyIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export function SecureDataPreview() {
  const [textEncript, setTextEncript] = useState('')

  return (
    <div className="w-full max-w-3xl shadow-xl h-[31.625rem] max-h-[calc(60vh+58px)] sm:rounded-xl lg:h-[34.6875rem] xl:h-[31.625rem] bg-card/70 backdrop-blur ring-1 ring-inset ring-emerald-900">
      <div className="relative w-full flex flex-col">
        <div className="flex-none border-b border-slate-500/30">
          <div className="flex items-center h-8 space-x-1.5 px-3">
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-slate-600 rounded-full" />
          </div>
        </div>
        <Editor
          className="overflow-y-scroll h-[calc(60vh-32px)]"
          onDebouncedUpdate={async (editor) => {
            try {
              if (editor != null) {
                const response = await encriptText(editor.getHTML())
                setTextEncript(response)
              }
            } catch (e) {
              console.log(e)
            }
          }}
        />
        <pre className="bg-card relative overflow-x-auto px-2 py-4 h-14">
          <code className="rounded py-[0.2rem] text-sm">{textEncript}</code>
          <CopyButton value={textEncript} className="absolute right-4 top-4" />
        </pre>
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
