import { Box, FormControl, FormHelperText, FormLabel, InputAdornment, OutlinedInput } from '@mui/material'
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
    <FormControl variant="outlined">
      <Box sx={{ display: 'flex',flexDirection:'column', gap: '8px' }}>
        <FormLabel
          htmlFor='outlined-adornment-email'
          error={(!validityError && text !== '') || errorRequest !== ''}
          sx={{
            pl: '8px',
            "&.MuiFormLabel-root.Mui-focused ~ .MuiInputBase-root .MuiSvgIcon-root": {
              color: '#00575C'
            },
            "&.MuiFormLabel-root.Mui-error ~ .MuiInputBase-root .MuiSvgIcon-root": {
              color: '#d32f2f'
            },
          }}
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
            <InputAdornment position='start'>
              <EmailRoundedIcon />
            </InputAdornment>
          }
        />
      </Box>
      {(!validityError && text !== '') && <FormHelperText error id="component-error-text">{errorText}</FormHelperText>}
      {(errorRequest !== '') && <FormHelperText error id="component-error-text">{errorRequest}</FormHelperText>}
    </FormControl>
  )
}
