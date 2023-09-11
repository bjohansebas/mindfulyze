'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { TiptapExtensions } from '@/ui/editor/extensions'
import { TiptapEditorProps } from '@/ui/editor/props'
import { generateJSON, useEditor } from '@tiptap/react'
import { Dispatch, SetStateAction, useMemo } from 'react'

import { createTemplate, updateTemplate } from '@/app/actions/templates'
import Spinner from '@/components/shared/icons/spinner'
import { TemplateSchema } from '@/schemas/template'
import { Button } from '@/ui/button'
import Editor from '@/ui/editor'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'
import { useApp } from '@/lib/hooks/useApp'

interface EditorTemplateProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export function EditorTemplate({ setIsOpen }: EditorTemplateProps) {
  const { setTemplates, templateSelect, newTemplate } = useApp()

  const initialText = useMemo(() => {
    return generateJSON(templateSelect?.text || '', TiptapExtensions)
  }, [templateSelect])

  const editor = useEditor({
    content: newTemplate ? '' : initialText,
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

  const form = useForm<z.infer<typeof TemplateSchema>>({
    resolver: zodResolver(TemplateSchema),
    defaultValues: {
      textWithFormat: newTemplate ? '' : templateSelect?.text,
      textWithoutFormat: newTemplate ? '' : templateSelect?.text,
      title: newTemplate ? '' : templateSelect?.title,
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(data: z.infer<typeof TemplateSchema>) {
    editor?.setEditable(false)

    try {
      if (!newTemplate && templateSelect != null) {
        const response = await updateTemplate(templateSelect?.id, data)

        if (response.status === 201 && response.data == true) {
          editor?.commands.setContent('')
          form.reset()

          setTemplates((prev) => {
            const templates = [...prev]

            const templateUpdated = templates.find((value) => value.id === templateSelect.id)

            if (templateUpdated != null) {
              templateUpdated.text = data.textWithFormat
              templateUpdated.title = data.title
            }

            return templates
          })

          toast.success('Template was updated')
        } else {
          toast.error(response.message)
        }
      } else {
        const response = await createTemplate(data)

        if (response.status === 201 && response.data != null) {
          editor?.commands.setContent('')
          form.reset()

          setTemplates((prev) => prev.concat([{ isSelect: response.data.default, ...response.data }]))

          toast.success('Template was created')
        } else {
          toast.error(response.message)
        }
      }
    } catch (e) {
      console.log(e)
    } finally {
      setIsOpen(false)
      editor?.setEditable(true)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col bg-white rounded-lg h-full max-h-[90vh] gap-3 w-full overflow-x-hidden"
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
          name="textWithoutFormat"
          render={() => (
            <FormItem>
              <Editor editor={editor} className="border rounded-xl h-[60vh]" />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
            {newTemplate ? 'Create' : 'Update'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditorTemplate
