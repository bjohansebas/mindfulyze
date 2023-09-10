'use client'

import { Template } from "@/@types/template";
import useTemplates from "@/lib/hooks/useTemplates";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

export const AppContext = createContext<{
  templates: Template[];
  setTemplates: Dispatch<SetStateAction<Template[]>>;
}>({
  templates: [],
  setTemplates: () => { },
});

export default function ProviderApp({ children }: { children: ReactNode }) {
  const { setTemplates, templates } = useTemplates();

  return (
    <AppContext.Provider
      value={{
        setTemplates, templates,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
