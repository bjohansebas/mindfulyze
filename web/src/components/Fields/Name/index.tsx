import { Box, FormControl, FormHelperText, FormLabel, OutlinedInput } from '@mui/material'

import { type SetStateAction, type Dispatch, useState, useEffect, useId } from 'react'

import { NAMES_REGEX } from 'utils/regex'

export interface NameFieldProps {
  text: string
  setText: Dispatch<SetStateAction<string>>
  label: JSX.Element
  requiredValid?: boolean
  errorRequest?: string
  errorText?: string
  isDisable?: boolean
  setValid?: Dispatch<SetStateAction<boolean>>
}

export function NameField({ text, errorText, errorRequest, setText, label, isDisable, requiredValid = false, setValid }: NameFieldProps): JSX.Element {
  const fieldId = useId()
  const [validityError, setValidityError] = useState<boolean>(true)

  useEffect(() => {
    if (requiredValid) {
      setValidityError(NAMES_REGEX.test(text))
      if (setValid !== undefined) {
        setValid(NAMES_REGEX.test(text))
      }
    }
  }, [text])

  return (
    <FormControl variant="outlined">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <FormLabel
          htmlFor={`name-${fieldId}`}
          error={(!validityError && text !== '') || errorRequest !== ''}
          sx={{
            pl: '8px',
            "&.MuiFormLabel-root.Mui-error ~ .MuiInputBase-root .MuiSvgIcon-root": {
              color: '#D25959'
            },
          }}
        >
          {label}
        </FormLabel>
        <OutlinedInput
          id={`name-${fieldId}`}
          value={text}
          type='text'
          onChange={(e) => { setText(e.target.value) }}
          disabled={isDisable}
          error={(!validityError && text !== '') || errorRequest !== ''}
          placeholder=''
        />
      </Box>
      {(!validityError && text !== '') && <FormHelperText error id={`component-error-${fieldId}`}>{errorText}</FormHelperText>}
      {(errorRequest !== '') && <FormHelperText error id={`component-error-${fieldId}`}>{errorRequest}</FormHelperText>}
    </FormControl>
  )
}
