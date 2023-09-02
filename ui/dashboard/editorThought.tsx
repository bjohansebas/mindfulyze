'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { TiptapExtensions } from '@/ui/editor/extensions'
import { TiptapEditorProps } from '@/ui/editor/props'
import { useEditor } from '@tiptap/react'

import { createThought } from '@/app/actions/thought'
import Spinner from '@/components/shared/icons/spinner'
import { cn } from '@/lib/utils'
import { ThoughtSchema } from '@/schemas/thought'
import { Button } from '@/ui/button'
import { Calendar } from '@/ui/calendar'
import Editor from '@/ui/editor'
import { Form, FormControl, FormField, FormItem } from '@/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover'

export function EditorThought() {
  const editor = useEditor({
    extensions: TiptapExtensions,
    editorProps: TiptapEditorProps,
    onUpdate: ({ editor }) => {
      const textHTML = editor.getHTML()
      const textPlain = editor.getText()

      form.setValue('text', { withFormat: textHTML, withoutFormat: textPlain })
    },
    autofocus: 'end',
  })

  const form = useForm<z.infer<typeof ThoughtSchema>>({
    resolver: zodResolver(ThoughtSchema),
    defaultValues: {
      text: {
        withFormat: '',
        withoutFormat: '',
      },
      created: new Date(),
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof ThoughtSchema>) {
    editor?.setEditable(false)

    try {
      const res = await createThought(data)

      if (res.status === 201) {
        editor?.commands.setContent('')
        form.setValue('text', { withFormat: '', withoutFormat: '' })

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
        className="flex flex-col bg-white gap-1 sm:w-2/4 min-w-[300px] w-screen rounded-lg"
      >
        <FormField control={form.control} name="text" render={() => <Editor editor={editor} />} />
        <div className="flex justify-between items-center px-6 py-2">
          <FormField
            control={form.control}
            name="created"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                      >
                        {field.value ? format(field.value, 'PPP') : format(new Date(), 'PPP')}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSubmitting || form.getValues()?.text?.withoutFormat.length < 20}>
            {isSubmitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditorThought
