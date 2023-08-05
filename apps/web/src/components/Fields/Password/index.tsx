import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import { Input } from '@nextui-org/react'

import { PWD_REGEX } from '@/utils/regex'

export interface PasswordTextFieldProps {
  text: string
  label: JSX.Element
  setText: Dispatch<SetStateAction<string>>
  requiredValid?: boolean
  comparePassword?: string
  errorText?: string
  isDisable?: boolean
}

export const PasswordTextField = ({
  text,
  errorText,
  comparePassword = '',
  setText,
  label,
  isDisable = false,
  requiredValid = false,
}: PasswordTextFieldProps): JSX.Element => {
  const [isValid, setIsValid] = useState<boolean>(true)

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [disable, setDisable] = useState<boolean>(isDisable)

  const toggleVisibility = (): void => {
    setShowPassword((show) => !show)
  }

  const isError = !isValid ? 'invalid' : 'valid'

  useEffect(() => {
    if (comparePassword !== '' && text !== '') {
      setIsValid(text === comparePassword)
    } else if (requiredValid && text !== '') {
      setIsValid(PWD_REGEX.test(text))
    }
  })

  useEffect(() => {
    if (isDisable) {
      setDisable(
        (comparePassword !== text && !PWD_REGEX.test(comparePassword) && !PWD_REGEX.test(text)) ||
          !PWD_REGEX.test(comparePassword),
      )
    }
  }, [text, comparePassword])

  return (
    <Input
      type={showPassword ? 'text' : 'password'}
      label={label}
      variant='bordered'
      isDisabled={disable}
      color='primary'
      errorMessage={!isValid && !disable ? errorText : ''}
      value={text}
      validationState={requiredValid ? isError : 'valid'}
      onChange={(e) => {
        setText(e.target.value)
      }}
      endContent={
        <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
          {showPassword ? (
            <EyeSlashIcon className='text-2xl text-default-400 pointer-events-none' />
          ) : (
            <EyeIcon className='text-2xl text-default-400 pointer-events-none' />
          )}
        </button>
      }
    />
  )
}

export default PasswordTextField
