import { blockquoteVariants } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

import { InputRule } from '@tiptap/core'
import { Color } from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Placeholder from '@tiptap/extension-placeholder'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import Typography from '@tiptap/extension-typography'
import TiptapUnderline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import { Markdown } from 'tiptap-markdown'
import SlashCommand from './slash-command'

export const TiptapExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside leading-3 -mt-2',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside leading-3 -mt-2',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'leading-normal -mb-2',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: cn(blockquoteVariants({ alignment: 'left', variant: 'outline', size: 'sm' })),
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class: 'rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800',
      },
    },
    code: {
      HTMLAttributes: {
        class: 'rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900',
        spellcheck: 'false',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
    gapcursor: false,
  }),
  // patch to fix horizontal rule bug: https://github.com/ueberdosis/tiptap/pull/3859#issuecomment-1536799740
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {}

            const { tr } = state
            const start = range.from
            const end = range.to

            tr.insert(start - 1, this.type.create(attributes)).delete(tr.mapping.map(start), tr.mapping.map(end))
          },
        }),
      ]
    },
  }).configure({
    HTMLAttributes: {
      class: 'mt-4 mb-6 border-t border-stone-300',
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`
      }
      return "Press '/' for commands"
    },
    includeChildren: true,
  }),
  SlashCommand,
  TiptapUnderline,
  TextStyle,
  Typography,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'not-prose',
    },
  }),
  TaskItem.configure({
    HTMLAttributes: {
      class: 'flex items-start my-0.5',
    },
    nested: true,
  }),
  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
]
