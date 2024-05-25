import { blockquoteVariants } from '@mindfulyze/ui'
import { cn } from '@mindfulyze/utils'

import Typography from '@tiptap/extension-typography'
import { HorizontalRule, Placeholder, StarterKit, TaskItem, TaskList } from 'novel/extensions'
import AutoJoiner from 'tiptap-extension-auto-joiner'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import { slashCommand } from './slash-command'

const taskList = TaskList.configure({
  HTMLAttributes: {
    class: cn('not-prose pl-2'),
  },
})
const taskItem = TaskItem.configure({
  HTMLAttributes: {
    class: cn('flex gap-2 items-start my-4'),
  },
  nested: true,
})

const horizontalRule = HorizontalRule.configure({
  HTMLAttributes: {
    class: cn('mt-4 mb-6 border-t border-muted-foreground'),
  },
})

const placeholder = Placeholder

const typography = Typography

const dragHandle = GlobalDragHandle.configure({
  dragHandleWidth: 20,
  scrollTreshold: 100,
})

const autoJoiner = AutoJoiner.configure({
  elementsToJoin: ['bulletList', 'orderedList'],
})

const starterKit = StarterKit.configure({
  bulletList: {
    HTMLAttributes: {
      class: cn('list-disc list-outside leading-3 -mt-2'),
    },
  },
  orderedList: {
    HTMLAttributes: {
      class: cn('list-decimal list-outside leading-3 -mt-2'),
    },
  },
  listItem: {
    HTMLAttributes: {
      class: cn('leading-normal -mb-2'),
    },
  },
  blockquote: {
    HTMLAttributes: {
      class: cn(blockquoteVariants({ alignment: 'left', variant: 'outline', size: 'sm' })),
    },
  },
  codeBlock: {
    HTMLAttributes: {
      class: cn('rounded-md bg-muted text-muted-foreground border p-5 font-mono font-medium'),
    },
  },
  code: {
    HTMLAttributes: {
      class: cn('rounded-md bg-muted  px-1.5 py-1 font-mono font-medium'),
      spellcheck: 'false',
    },
  },
  horizontalRule: false,
  dropcursor: {
    color: '#DBEAFE',
    width: 4,
  },
  gapcursor: false,
})

export const extensions = [
  dragHandle,
  autoJoiner,
  taskList,
  taskItem,
  horizontalRule,
  starterKit,
  placeholder,
  slashCommand,
  typography,
]
