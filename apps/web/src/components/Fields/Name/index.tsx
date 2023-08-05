import { Input } from '@nextui-org/react'

import { useState, type Dispatch, type SetStateAction } from 'react'

import { NAMES_REGEX } from 'utils/regex'

export interface NameFieldProps {
  text: string
  label: JSX.Element
  isDisable?: boolean
  requiredValid?: boolean
  errorText?: string
  setText: Dispatch<SetStateAction<string>>
}

export function NameField({
  text,
  errorText,
  setText,
  label,
  isDisable,
  requiredValid = false,
}: NameFieldProps): JSX.Element {
  const [isValid, setIsValid] = useState<boolean>(true)

  const validEmail = (input: string) => {
    setIsValid(NAMES_REGEX.test(input))
  }

  const isError = !isValid ? 'invalid' : 'valid'

  return (
    <Input
      type='text'
      color='primary'
      label={label}
      value={text}
      onChange={(e) => {
        if (requiredValid && text != null) {
          validEmail(e.target.value)
        }
        setText(e.target.value)
      }}
      disabled={isDisable}
      variant='bordered'
      errorMessage={!isValid ? errorText : ''}
      validationState={requiredValid ? isError : 'valid'}
      required
    />
  )
}
