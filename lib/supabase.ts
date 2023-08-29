import { createClient } from '@supabase/supabase-js'
import { SUPABASE_ANON_KEY, SUPABASE_BUCKET, SUPABASE_URL } from './constants/supabase'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const createFile = async ({ name, text }: { name: string; text: string }) => {
  const { data, error } = await supabase.storage.from(SUPABASE_BUCKET).upload(name, text)
  return { data, error }
}

export const downloadFile = async ({ name }: { name: string }) => {
  const { data, error } = await supabase.storage.from(SUPABASE_BUCKET).download(name)

  return { data, error }
}

export default supabase
