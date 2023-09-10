'use client'

import { Template } from "@/@types/template";
import useTemplates from "@/lib/hooks/useTemplates";
import { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from "react";

export const AppContext = createContext<{
  templates: Template[];
  loadingTemplate: boolean;
  setTemplates: Dispatch<SetStateAction<Template[]>>;
  templateSelect: string | undefined;
  setTemplateSelect: Dispatch<SetStateAction<string | undefined>>;
}>({
  templates: [],
  setTemplates: () => { },
  loadingTemplate: true,
  templateSelect: undefined,
  setTemplateSelect: () => { }
});

export default function ProviderApp({ children }: { children: ReactNode }) {
  const { setTemplates, templates, isLoadingTemplates, setTemplateSelect, templateSelect } = useTemplates();

  return (
    <AppContext.Provider
      value={{
        setTemplates, templates, loadingTemplate: isLoadingTemplates,
        templateSelect, setTemplateSelect
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
