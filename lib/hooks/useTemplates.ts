import { Template } from "@/@types/template";
import { getTemplates } from "@/app/actions/templates";
import { useEffect, useMemo, useState } from "react";

export default function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true)
  const [templateSelect, setTemplateSelect] = useState<string>()

  const getThoughtsUser = async () => {
    const response = await getTemplates()
    if (response.status === 200) {
      setTemplates(response.data)
    }

    setIsLoadingTemplates(false)
  }

  useEffect(() => {
    setIsLoadingTemplates(true)

    getThoughtsUser()

    setTemplateSelect(templates.find((value) => value.default)?.id)
  }, []);

  return {
    isLoadingTemplates, templateSelect, setTemplateSelect, ...useMemo(
      () => ({ templates, setTemplates }),
      [templates, setTemplates],
    )
  }
}