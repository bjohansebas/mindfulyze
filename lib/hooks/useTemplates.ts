import { TemplateApp } from "@/@types/template";
import { getTemplates } from "@/app/actions/templates";

import { useEffect, useMemo, useState } from "react";

export default function useTemplates() {
  const [templates, setTemplates] = useState<TemplateApp[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true)

  const getThoughtsUser = async () => {
    const response = await getTemplates()

    if (response.status === 200) {
      const data = response.data.map((value) => {
        if (value.default) return { ...value, isSelect: true }

        return { ...value, isSelect: false }
      })
      setTemplates(data)
    }

    setIsLoadingTemplates(false)
  }

  useEffect(() => {
    setIsLoadingTemplates(true)

    void getThoughtsUser()
  }, []);

  const templateSelect = useMemo(() => {
    return templates.find((value) => value.isSelect)
  }, [templates])

  return {
    isLoadingTemplates, templateSelect, ...useMemo(
      () => ({ templates, setTemplates }),
      [templates],
    )
  }
}