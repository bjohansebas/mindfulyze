import { Editor, Extension, Range } from '@tiptap/core'
import { ReactRenderer } from '@tiptap/react'
import Suggestion from '@tiptap/suggestion'
import {
  CheckSquare,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  // MessageSquarePlus,
  Text,
  TextQuote,
} from 'lucide-react'
import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import tippy from 'tippy.js'

interface CommandItemProps {
  title: string
  description: string
  icon: ReactNode
}

interface CommandProps {
  editor: Editor
  range: Range
}

const Command = Extension.create({
  name: 'slash-command',
  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor
          range: Range
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          props: any
        }) => {
          props.command({ editor, range })
        },
      },
    }
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})

const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    // {
    //   title: 'Send Feedback',
    //   description: 'Let us know how we can improve.',
    //   icon: <MessageSquarePlus size={18} />,
    //   command: ({ editor, range }: CommandProps) => {
    //     editor.chain().focus().deleteRange(range).run()
    //     window.open('/feedback', '_blank')
    //   },
    // },
    {
      title: 'Text',
      description: 'Just start typing with plain text.',
      searchTerms: ['p', 'paragraph'],
      icon: <Text size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').run()
      },
    },
    {
      title: 'To-do List',
      description: 'Track tasks with a to-do list.',
      searchTerms: ['todo', 'task', 'list', 'check', 'checkbox'],
      icon: <CheckSquare size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleTaskList().run()
      },
    },
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large', 'h1'],
      icon: <Heading1 size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 1 }).run()
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      searchTerms: ['subtitle', 'medium', 'h2'],
      icon: <Heading2 size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 2 }).run()
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      searchTerms: ['subtitle', 'small', 'h3'],
      icon: <Heading3 size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).setNode('heading', { level: 3 }).run()
      },
    },
    {
      title: 'Bullet List',
      description: 'Create a simple bullet list.',
      searchTerms: ['unordered', 'point'],
      icon: <List size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run()
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering.',
      searchTerms: ['ordered'],
      icon: <ListOrdered size={18} />,
      command: ({ editor, range }: CommandProps) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run()
      },
    },
    {
      title: 'Quote',
      description: 'Capture a quote.',
      searchTerms: ['blockquote'],
      icon: <TextQuote size={18} />,
      command: ({ editor, range }: CommandProps) =>
        editor.chain().focus().deleteRange(range).toggleNode('paragraph', 'paragraph').toggleBlockquote().run(),
    },
    {
      title: 'Code',
      description: 'Capture a code snippet.',
      searchTerms: ['codeblock'],
      icon: <Code size={18} />,
      command: ({ editor, range }: CommandProps) => editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
    },
  ].filter((item) => {
    if (typeof query === 'string' && query.length > 0) {
      const search = query.toLowerCase()
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        item.searchTerms?.some((term: string) => term.includes(search))
      )
    }
    return true
  })
}

export const updateScrollView = (container: HTMLElement, item: HTMLElement) => {
  const containerHeight = container.offsetHeight
  const itemHeight = item ? item.offsetHeight : 0

  const top = item.offsetTop
  const bottom = top + itemHeight

  if (top < container.scrollTop) {
    container.scrollTop -= container.scrollTop - top + 5
  } else if (bottom > containerHeight + container.scrollTop) {
    container.scrollTop += bottom - containerHeight - container.scrollTop + 5
  }
}

const CommandList = ({
  items,
  command,
}: {
  items: CommandItemProps[]
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  command: any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  editor: any
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index]
      if (item) {
        command(item)
      }
    },
    [command, items],
  )

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter']
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault()
        if (e.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length)
          return true
        }
        if (e.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length)
          return true
        }
        if (e.key === 'Enter') {
          selectItem(selectedIndex)
          return true
        }
        return false
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [items, selectedIndex, setSelectedIndex, selectItem])

  useEffect(() => {
    setSelectedIndex(0)
  }, [items])

  const commandListContainer = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const container = commandListContainer?.current

    const item = container?.children[selectedIndex] as HTMLElement

    if (item && container) updateScrollView(container, item)
  }, [selectedIndex])

  return items.length > 0 ? (
    <div
      id="slash-command"
      ref={commandListContainer}
      className="z-50 h-auto max-h-[330px] w-72 overflow-y-auto rounded-md border px-1 py-2 shadow-md transition-all bg-background"
    >
      {items.map((item: CommandItemProps, index: number) => {
        return (
          <button
            type="button"
            className={`flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-card ${
              index === selectedIndex ? 'bg-card' : ''
            }`}
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
            onClick={() => selectItem(index)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-card">{item.icon}</div>
            <div>
              <p className="font-bold">{item.title}</p>
              <p className="text-xs">{item.description}</p>
            </div>
          </button>
        )
      })}
    </div>
  ) : null
}

const renderItems = () => {
  let component: ReactRenderer | null = null
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let popup: any | null = null

  return {
    onStart: (props: { editor: Editor; clientRect: DOMRect }) => {
      component = new ReactRenderer(CommandList, {
        props,
        editor: props.editor,
      })

      // @ts-ignore
      popup = tippy('body', {
        getReferenceClientRect: props.clientRect,
        appendTo: () => document.body,
        content: component.element,
        showOnCreate: true,
        interactive: true,
        trigger: 'manual',
        placement: 'bottom-start',
      })
    },
    onUpdate: (props: { editor: Editor; clientRect: DOMRect }) => {
      component?.updateProps(props)

      popup?.[0].setProps({
        getReferenceClientRect: props.clientRect,
      })
    },
    onKeyDown: (props: { event: KeyboardEvent }) => {
      if (props.event.key === 'Escape') {
        popup?.[0].hide()

        return true
      }

      // @ts-ignore
      return component?.ref?.onKeyDown(props)
    },
    onExit: () => {
      popup?.[0].destroy()
      component?.destroy()
    },
  }
}

const SlashCommand = Command.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
})

export default SlashCommand
