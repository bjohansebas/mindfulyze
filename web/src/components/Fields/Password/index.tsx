import { FormControl, IconButton, InputAdornment, FormHelperText, FormLabel, OutlinedInput, Box } from '@mui/material'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { type SetStateAction, type Dispatch, useState, useEffect } from 'react'

import { PWD_REGEX } from 'utils/regex'

export interface PasswordTextFieldProps {
  text: string
  setText: Dispatch<SetStateAction<string>>
  label: JSX.Element
  requiredValid?: boolean
  errorRequest?: string
  errorText?: string
  isDisable?: boolean
}

export function PasswordTextField({ text, errorText, errorRequest, setText, label, isDisable, requiredValid = false }: PasswordTextFieldProps): JSX.Element {
  const [validityError, setValidityError] = useState<boolean>(true)
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }

  useEffect(() => {
    if (requiredValid) {
      setValidityError(PWD_REGEX.test(text))
    }
  }, [text])

  return (
    <FormControl variant="outlined">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <FormLabel
          htmlFor='outlined-adornment-password'
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
          id='outlined-adornment-password'
          value={text}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => { setText(e.target.value) }}
          disabled={isDisable}
          error={(!validityError && text !== '') || errorRequest !== ''}
          placeholder='••••••••••••••'
          required
          startAdornment={
            <InputAdornment position='start'>
              <KeyRoundedIcon sx={{ mr: '8px' }} />
            </InputAdornment>
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
      </Box>
      {(!validityError && text !== '') && <FormHelperText error id="component-error-text">{errorText}</FormHelperText>}
      {(errorRequest !== '') && <FormHelperText error id="component-error-text">{errorRequest}</FormHelperText>}
    </FormControl>
  )
}
