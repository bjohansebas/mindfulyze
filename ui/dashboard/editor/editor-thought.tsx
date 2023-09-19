'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { TiptapExtensions } from '@/ui/editor/extensions'
import { TiptapEditorProps } from '@/ui/editor/props'
import { generateJSON, useEditor } from '@tiptap/react'

import { createThought } from '@/app/actions/thoughts'
import Spinner from '@/components/shared/icons/spinner'
import { useApp } from '@/lib/hooks/useApp'
import { cn } from '@/lib/utils'
import { ThoughtSchema } from '@/schemas/thought'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/ui/dropdown-menu'
import Editor from '@/ui/editor'
import { Form, FormField, FormItem, FormMessage } from '@/ui/form'

export function EditorThought() {
  const { templateSelect } = useApp()

  const initialText = useMemo(() => {
    return generateJSON(templateSelect?.text || '', TiptapExtensions)
  }, [templateSelect])

  const editor = useEditor({
    content: initialText,
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: ({ editor }) => {
      const textHTML = editor.getHTML()
      const textPlain = editor.getText()

      form.setValue('textWithFormat', textHTML)
      form.setValue('textWithoutFormat', textPlain)
    },
    autofocus: 'end',
  })

  const form = useForm<z.infer<typeof ThoughtSchema>>({
    resolver: zodResolver(ThoughtSchema),
    defaultValues: {
      textWithFormat: templateSelect?.text,
      textWithoutFormat: templateSelect?.text,
      created: new Date(),
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof ThoughtSchema>) {
    editor?.setEditable(false)

    try {
      const response = await createThought(data)

      if (response.status === 201) {
        editor?.commands.setContent('')
        form.reset()

        toast.success('Thought was created')
      } else {
        toast.error("The thought couldn't be created, try again anew.")
      }
    } catch (e) {
      console.log(e)
    } finally {
      editor?.setEditable(true)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col bg-white rounded-lg h-full max-h-[80vh] gap-3 overflow-x-hidden"
      >
        <FormField
          control={form.control}
          name="textWithoutFormat"
          render={() => (
            <FormItem>
              <Editor editor={editor} className="border rounded-xl sm:h-[70vh] h-[65vh]" />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center flex-wrap gap-4">
          <FormField
            control={form.control}
            name="created"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      variant={'outline'}
                      className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'PPP') : format(new Date(), 'PPP')}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditorThought
