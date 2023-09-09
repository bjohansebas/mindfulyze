'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { TiptapExtensions } from '@/ui/editor/extensions'
import { TiptapEditorProps } from '@/ui/editor/props'
import { useEditor } from '@tiptap/react'

import { createTemplate } from '@/app/actions/templates'
import Spinner from '@/components/shared/icons/spinner'
import { TemplateSchema } from '@/schemas/template'
import { Button } from '@/ui/button'
import Editor from '@/ui/editor'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'

export function EditorTemplate() {
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

  const form = useForm<z.infer<typeof TemplateSchema>>({
    resolver: zodResolver(TemplateSchema),
    defaultValues: {
      text: {
        withFormat: '',
        withoutFormat: '',
      },
      title: '',
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof TemplateSchema>) {
    editor?.setEditable(false)

    try {
      const response = await createTemplate(data)

      if (response.status === 201) {
        editor?.commands.setContent('')
        form.reset()

        toast.success('Template was created')
      } else {
        toast.error("The template couldn't be created, try again anew.")
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
        className="flex flex-col bg-white rounded-lg h-full max-h-[80vh] gap-5"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Untitled" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="text"
          render={() => (
            <FormItem>
              <Editor editor={editor} className="border rounded-xl h-[60vh]" />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Button type="submit" disabled={isSubmitting || form.getValues()?.text?.withoutFormat.length < 20}>
            {isSubmitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            Create
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditorTemplate
