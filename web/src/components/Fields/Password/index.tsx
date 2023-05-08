import { FormControl, IconButton, InputAdornment, FormHelperText, FormLabel, OutlinedInput } from '@mui/material'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { type SetStateAction, type Dispatch, useState, useEffect } from 'react'

import { PWD_REGEX } from 'utils/regex'

export interface PasswordTextFieldProps {
  text: string
  showPassword: boolean
  setText: Dispatch<SetStateAction<string>>
  setShowPassword: Dispatch<SetStateAction<boolean>>
  label: JSX.Element
  requiredValid?: boolean
  errorRequest?: string
  errorText?: string
  isDisable?: boolean
}

export function PasswordTextField({ text, errorText, errorRequest, setText, showPassword, setShowPassword, label, isDisable, requiredValid = false }: PasswordTextFieldProps): JSX.Element {
  const [validityError, setValidityError] = useState<boolean>(true)
  const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }

  useEffect(() => {
    if (requiredValid) {
      setValidityError(PWD_REGEX.test(text))
    }
  }, [text])

  return (
    <FormControl variant="outlined" sx={{ gap: '8px' }}>
      <FormLabel
        htmlFor='outlined-adornment-password'
        error={(!validityError && text !== '') || errorRequest !== ''}
        sx={{ pl: '8px' }}
      >
        {label}
      </FormLabel>
      <OutlinedInput
        id='outlined-adornment-password'
        value={text}
        type={showPassword ? 'text' : 'password'}
        onChange={(e) => { setText(e.target.value) }}
        disabled={isDisable}
        error={(!validityError && text !== '') || errorRequest !== ''}
        placeholder='••••••••••••••••'
        required
        startAdornment={
          <KeyRoundedIcon sx={{ mr: '8px' }} />
        }
        endAdornment={
          <InputAdornment position="start">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOffRounded /> : <VisibilityRounded />}
            </IconButton>
          </InputAdornment>
        }
      />
      {(!validityError && text !== '') && <FormHelperText error id="component-error-text">{errorText}</FormHelperText>}
      {(errorRequest !== '') && <FormHelperText error id="component-error-text">{errorRequest}</FormHelperText>}
    </FormControl>
  )
}
