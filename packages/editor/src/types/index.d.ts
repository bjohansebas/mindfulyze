export type SelectorItem = {
  name: string
  icon: LucideIcon
  command: (editor: ReturnType<typeof useEditor>['editor']) => void
  isActive: (editor: ReturnType<typeof useEditor>['editor']) => boolean
}

export interface BubbleColorMenuItem {
  name: string
  color: string
}
