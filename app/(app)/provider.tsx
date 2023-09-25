'use client'

import { Template } from '@/@types/template'
import useTemplates from '@/lib/hooks/useTemplates'

import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

export const AppContext = createContext<{
  templates: Template[]
  loadingTemplate: boolean
  setTemplates: Dispatch<SetStateAction<Template[]>>
  templateSelect: Template | undefined
  newTemplate: boolean
  setNewTemplate: Dispatch<SetStateAction<boolean>>
}>({
  templates: [],
  setTemplates: () => {},
  loadingTemplate: true,
  templateSelect: undefined,
  newTemplate: false,
  setNewTemplate: () => false,
})

export default function ProviderApp({ children }: { children: ReactNode }) {
  const { setTemplates, templates, isLoadingTemplates, templateSelect } = useTemplates()
  const [newTemplate, setNewTemplate] = useState(false)

  return (
    <AppContext.Provider
      value={{
        setTemplates,
        templates,
        loadingTemplate: isLoadingTemplates,
        templateSelect,
        newTemplate,
        setNewTemplate,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
