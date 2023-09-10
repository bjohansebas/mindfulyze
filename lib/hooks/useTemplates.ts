import { Template } from "@/@types/template";
import { getTemplates } from "@/app/actions/templates";
import { useEffect, useMemo, useState } from "react";

export default function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);

  const getThoughtsUser = async () => {
    const response = await getTemplates()
    if (response.status === 200) {
      setTemplates(response.data)
    }
  }

  useEffect(() => {
    getThoughtsUser()
  }, []);

  return useMemo(
    () => ({ templates, setTemplates }),
    [templates, setTemplates],
  );
}