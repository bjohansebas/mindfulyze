import type { EditorProps } from '@tiptap/pm/view'

export const TiptapEditorProps: EditorProps = {
  attributes: {
    class: 'prose prose-sm prose-stone dark:prose-invert focus:outline-none max-w-full',
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      // prevent default event listeners from firing when slash command is active
      if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
        const slashCommand = document.querySelector('#slash-command')
        if (slashCommand) {
          return true
        }
      }
    },
  },
}
