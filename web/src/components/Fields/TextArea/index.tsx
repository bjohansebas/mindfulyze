import { TextareaAutosize } from '@mui/material'
import { type Dispatch, type SetStateAction } from 'react'

export interface TextAreaFieldProps {
	text: string
	setText?: Dispatch<SetStateAction<string>>
	loading?: boolean
	disabled?: boolean
}

export function TextAreaField({ loading, text, setText, disabled }: TextAreaFieldProps): JSX.Element {
	return (
		<TextareaAutosize
			disabled={loading === true || disabled === true}
			style={{ resize: 'none', height: '100%', fontSize: '16px', width: '100%', padding: '10px' }}
			value={text}
			onChange={(e) => {
				if (setText != null) {
					setText(e.target.value)
				}
			}}
		/>
	)
}
