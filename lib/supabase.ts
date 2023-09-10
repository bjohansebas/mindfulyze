import { createClient } from '@supabase/supabase-js'

import { SUPABASE_ANON_KEY, SUPABASE_URL } from './constants/supabase'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: false,
  },
})

export const createFile = async ({ name, text, bucket }: { name: string; text: string; bucket: string }) => {
  const { data, error } = await supabase.storage.from(bucket).upload(name, text, {
    contentType: 'text/html',
  })

  return { data, error }
}

export const downloadFile = async ({ name, bucket }: { name: string; bucket: string }) => {
  const { data, error } = await supabase.storage.from(bucket).download(name)

  return { data, error }
}

export const updateFile = async ({ name, text, bucket }: { name: string; text: string; bucket: string }) => {
  const { data, error } = await supabase.storage.from(bucket).upload(name, text, {
    contentType: 'text/html',
    upsert: true
  })

  return { data, error }
}

export const deleteFile = async ({ name, bucket }: { name: string; bucket: string }) => {
  const { data, error } = await supabase.storage.from(bucket).remove([name])

  return { data, error }
}


export default supabase
