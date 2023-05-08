import { FormControl, FormHelperText, FormLabel, OutlinedInput } from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';

import { type SetStateAction, type Dispatch, useState, useEffect } from 'react'

import { EMAIL_REGEX } from 'utils/regex'

export interface EmailFieldProps {
  text: string
  setText: Dispatch<SetStateAction<string>>
  label: JSX.Element
  requiredValid?: boolean
  errorRequest?: string
  errorText?: string
  isDisable?: boolean
}

export function EmailField({ text, errorText, errorRequest, setText, label, isDisable, requiredValid = false }: EmailFieldProps): JSX.Element {
  const [validityError, setValidityError] = useState<boolean>(true)

  useEffect(() => {
    if (requiredValid) {
      setValidityError(EMAIL_REGEX.test(text))
    }
  }, [text])

  return (
    <FormControl variant="outlined" sx={{ gap: '8px' }}>
      <FormLabel
        htmlFor='outlined-adornment-email'
        error={(!validityError && text !== '') || errorRequest !== ''}
        sx={{ pl: '8px' }}
      >
        {label}
      </FormLabel>
      <OutlinedInput
        id='outlined-adornment-email'
        value={text}
        type='email'
        onChange={(e) => { setText(e.target.value) }}
        disabled={isDisable}
        error={(!validityError && text !== '') || errorRequest !== ''}
        placeholder='lorem@gmail.com'
        required
        startAdornment={
          <EmailRoundedIcon sx={{ mr: '8px' }} />
        }
      />
      {(!validityError && text !== '') && <FormHelperText error id="component-error-text">{errorText}</FormHelperText>}
      {(errorRequest !== '') && <FormHelperText error id="component-error-text">{errorRequest}</FormHelperText>}
    </FormControl>
  )
}
