import { Template } from '@/types/template'
import { getTemplates } from 'app/actions/templates'

import { useEffect, useMemo, useState } from 'react'

export default function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true)

  const getThoughtsUser = async () => {
    const response = await getTemplates()

    if (response.status === 200) {
      setTemplates(response.data)
    }

    setIsLoadingTemplates(false)
  }

  useEffect(() => {
    setIsLoadingTemplates(true)

    void getThoughtsUser()
  }, [])

  const templateSelect = useMemo(() => {
    return templates.find((value) => value.default)
  }, [templates])

  return {
    isLoadingTemplates,
    templateSelect,
    ...useMemo(() => ({ templates, setTemplates }), [templates]),
  }
}
