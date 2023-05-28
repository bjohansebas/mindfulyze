import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { type SetStateAction, type Dispatch, useEffect, useId } from 'react'

import { GENDER_REGEX } from 'utils/regex'

export interface RadioOption {
  label: string | JSX.Element
  value: string
}

export interface RadioFieldProps {
  option: string
  setOption: Dispatch<SetStateAction<string>>
  options: RadioOption[]
  label: JSX.Element
  setValid?: Dispatch<SetStateAction<boolean>>
}

export function RadioField ({ option, setOption, label, setValid, options }: RadioFieldProps): JSX.Element {
  const fieldId = useId()

  useEffect(() => {
    if (setValid !== undefined) {
      setValid(GENDER_REGEX.test(option))
    }
  }, [option])

  return (
    <FormControl color='primary'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <FormLabel id={`radio-${fieldId}`}>
          {label}
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby={`radio-${fieldId}`}
          value={option}
          onChange={(e) => { setOption(e.target.value) }}
          color='primary'
        >
          {
            options.map(({ value, label }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio color='primary' />}
                label={label} />
            ))
          }
        </RadioGroup>
      </Box>
    </FormControl>
  )
}
