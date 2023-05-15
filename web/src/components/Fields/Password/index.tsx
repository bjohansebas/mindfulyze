import { FormControl, IconButton, InputAdornment, FormHelperText, FormLabel, OutlinedInput, Box } from '@mui/material'
import { VisibilityOffRounded, VisibilityRounded } from '@mui/icons-material'
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

import { type SetStateAction, type Dispatch, useState, useEffect, useId } from 'react'

import { PWD_REGEX } from 'utils/regex'

export interface PasswordTextFieldProps {
  text: string
  label: JSX.Element
  setText: Dispatch<SetStateAction<string>>
  requiredValid?: boolean
  comparePassword?: string
  errorRequest?: string
  errorText?: string
  isDisable?: boolean
  setValid?: Dispatch<SetStateAction<boolean>>
}

export function PasswordTextField({ text, errorText, errorRequest, comparePassword = '', setText, label, isDisable = false, requiredValid = false, setValid }: PasswordTextFieldProps): JSX.Element {
  const fieldId = useId()

  const [validityError, setValidityError] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(isDisable)

  const handleClickShowPassword = (): void => { setShowPassword((show) => !show) }

  useEffect(() => {
    if (requiredValid) {
      setValidityError(!PWD_REGEX.test(text))
      if (setValid !== undefined) {
        setValid(PWD_REGEX.test(text))
      }
    }
    else if (comparePassword !== '') {
      setValidityError(text === comparePassword)
      if (setValid !== undefined) {
        setValid(text === comparePassword)
      }
    }
  }, [text, comparePassword])

  useEffect(() => {
    if (isDisable) {
      setDisable((comparePassword !== text && !PWD_REGEX.test(text) && !PWD_REGEX.test(comparePassword)) || !PWD_REGEX.test(comparePassword))
    }
  }, [comparePassword, text])

  return (
    <FormControl variant="outlined">
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <FormLabel
          htmlFor={`password-${fieldId}`}
          error={
            (((requiredValid && validityError && text !== '') || (PWD_REGEX.test(comparePassword) && comparePassword !== text)) && text !== '') || errorRequest !== ''
          }
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
          id={`password-${fieldId}`}
          value={text}
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => { setText(e.target.value) }}
          disabled={disable}
          error={
            (((requiredValid && validityError && text !== '') || (PWD_REGEX.test(comparePassword) && comparePassword !== text)) && text !== '') || errorRequest !== ''
          }
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
      {(((requiredValid && validityError) || (PWD_REGEX.test(comparePassword) && comparePassword !== text)) && text !== '')
        && <FormHelperText error id={`error-text-${fieldId}`}>{errorText}</FormHelperText>}
      {(errorRequest !== '') && <FormHelperText error id={`error-text-${fieldId}`}>{errorRequest}</FormHelperText>}
    </FormControl>
  )
}
