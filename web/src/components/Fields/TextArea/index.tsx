import { TextareaAutosize } from '@mui/material'
import { type Dispatch, type SetStateAction } from 'react'

export interface TextAreaFieldProps {
  text: string
  setText: Dispatch<SetStateAction<string>>
  loading?: boolean
}

export function TextAreaField ({ loading, text, setText }: TextAreaFieldProps): JSX.Element {
  return <TextareaAutosize
  disabled={loading}
  style={{ resize: 'none', height: '100%', fontSize: '16px', width: '100%', padding: '10px' }}
  value={text}
  onChange={(e) => { setText(e.target.value) }}
/>
}
