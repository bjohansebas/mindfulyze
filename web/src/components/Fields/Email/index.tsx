import { Box, FormControl, FormHelperText, FormLabel, InputAdornment, OutlinedInput } from '@mui/material'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'

import { type SetStateAction, type Dispatch, useState, useEffect, useId } from 'react'

import { EMAIL_REGEX } from 'utils/regex'

export interface EmailFieldProps {
  text: string
  setText: Dispatch<SetStateAction<string>>
  label: JSX.Element
  requiredValid?: boolean
  errorRequest?: string
  errorText?: string
  isDisable?: boolean
  setValid?: Dispatch<SetStateAction<boolean>>
}

export function EmailField ({ text, errorText, errorRequest, setText, label, isDisable, requiredValid = false, setValid }: EmailFieldProps): JSX.Element {
  const fieldId = useId()
  const [validityError, setValidityError] = useState<boolean>(true)

  useEffect(() => {
    if (requiredValid) {
      setValidityError(EMAIL_REGEX.test(text))
      if (setValid !== undefined) {
        setValid(EMAIL_REGEX.test(text))
      }
    }
  }, [text])

  return (
    <FormControl variant="outlined">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <FormLabel
          htmlFor={`email-${fieldId}`}
          error={(!validityError && text !== '') || errorRequest !== ''}
          sx={{
            pl: '8px',
            '&.MuiFormLabel-root.Mui-error ~ .MuiInputBase-root .MuiSvgIcon-root': {
              color: '#D25959'
            }
          }}
        >
          {label}
        </FormLabel>
        <OutlinedInput
          id={`email-${fieldId}`}
          value={text}
          type='email'
          onChange={(e) => { setText(e.target.value) }}
          disabled={isDisable}
          error={(!validityError && text !== '') || errorRequest !== ''}
          placeholder='lorem@gmail.com'
          required
          startAdornment={
            <InputAdornment position='start'>
              <EmailRoundedIcon/>
            </InputAdornment>
          }
        />
      </Box>
      {(!validityError && text !== '') && <FormHelperText error id={`component-error-${fieldId}`}>{errorText}</FormHelperText>}
      {(errorRequest !== '') && <FormHelperText error id={`component-error-${fieldId}`}>{errorRequest}</FormHelperText>}
    </FormControl>
  )
}
