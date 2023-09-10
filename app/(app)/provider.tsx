'use client'

import { TemplateApp } from "@/@types/template";
import useTemplates from "@/lib/hooks/useTemplates";

import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

export const AppContext = createContext<{
  templates: TemplateApp[];
  loadingTemplate: boolean;
  setTemplates: Dispatch<SetStateAction<TemplateApp[]>>;
  templateSelect: TemplateApp | undefined;
}>({
  templates: [],
  setTemplates: () => { },
  loadingTemplate: true,
  templateSelect: undefined,
});

export default function ProviderApp({ children }: { children: ReactNode }) {
  const { setTemplates, templates, isLoadingTemplates, templateSelect } = useTemplates();

  return (
    <AppContext.Provider
      value={{
        setTemplates, templates, loadingTemplate: isLoadingTemplates,
        templateSelect
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
