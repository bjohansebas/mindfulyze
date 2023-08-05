import { Input } from '@nextui-org/react'

import { useState, type Dispatch, type SetStateAction } from 'react'

import { EMAIL_REGEX } from 'utils/regex'

export interface EmailFieldProps {
  text: string | undefined
  label: JSX.Element
  isDisable?: boolean
  requiredValid?: boolean
  errorText?: string
  setText: Dispatch<SetStateAction<string | undefined>>
}

export const EmailField = ({ text, errorText, label, isDisable, requiredValid = false, setText }: EmailFieldProps) => {
  const [isValid, setIsValid] = useState<boolean>(true)

  const validEmail = (input: string) => {
    setIsValid(EMAIL_REGEX.test(input))
  }

  const isError = !isValid ? 'invalid' : 'valid'

  return (
    <Input
      type='email'
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

export default EmailField
