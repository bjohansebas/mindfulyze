import { useState, type FormEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'

import { useApp } from '@/hooks/useApp'
import { postSignUpAccount } from 'services/signUp'
import { EMAIL_REGEX, PWD_REGEX } from 'utils/regex'

import { Banner } from '@/components/Banner'
import { EmailField } from '@/components/Fields/Email'
import { Button } from '@nextui-org/react'
import { PasswordTextField } from 'components/Fields/Password'

export const SignUpPage = (): JSX.Element => {
  const { loginAction } = useApp()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string | undefined>('')

  const [pwd, setPwd] = useState<string>('')

  const [confirmPwd, setConfirmPwd] = useState<string>('')

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    if (email == null) return
    const testEmail = EMAIL_REGEX.test(email)
    const testPwd = PWD_REGEX.test(pwd)

    if (!testEmail || !testPwd) {
      setLoading(false)
    } else {
      try {
        await postSignUpAccount(pwd, email)
        try {
          await loginAction(email, pwd)
          navigate('/account/new')
          setLoading(false)
        } catch (e) {
          navigate('/login')
        }
      } catch (err) {
        setLoading(false)
      }
    }
  }

  return (
    <div className='min-h-screen w-screen flex justify-center items-center flex-col sm:py-10'>
      <div className='shadow-xl border flex justify-center flex-col gap-8 rounded-xl max-w-[90%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] py-10 px-8 max-[640px]:px-4'>
        <header className='flex items-center gap-6 flex-col text-primary-800'>
          <Link to='/'>
            <Banner widthFavicon={40} heightText={24.26} widthText={230} />
          </Link>
          <div className='w-full px-2 gap-2 flex flex-col'>
            <h1 className='text-3xl font-extrabold'>Sign Up</h1>
            <h2 className='text-xl font-semibold'>Sign up now and begin your journey of self-discovery!</h2>
          </div>
        </header>
        <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex flex-col gap-4'>
            <EmailField
              text={email}
              setText={setEmail}
              requiredValid={true}
              errorText='Enter a valid email address'
              label={<FormattedMessage id='login.email' defaultMessage='Email' />}
            />
            <PasswordTextField
              text={pwd}
              setText={setPwd}
              requiredValid
              errorText='The password must have at least one lowercase letter, one number, and a length between 8 and 30 characters'
              label={<FormattedMessage id='signup.password' defaultMessage='Password' />}
            />
            <PasswordTextField
              text={confirmPwd}
              setText={setConfirmPwd}
              errorText='The passwords do not match. Please make sure both passwords are the same.'
              comparePassword={pwd}
              isDisable
              requiredValid
              label={<FormattedMessage id='signup.confirm' defaultMessage='Confirm password' />}
            />
          </div>
          <div className='flex gap-4 max-[640px]:gap-4 flex-row max-[640px]:flex-col'>
            <Button type='submit' color='primary' variant='solid' size='lg' disabled={loading} className='w-full'>
              <FormattedMessage id='signup.submit' defaultMessage='Sign up' />
            </Button>
            <Link to='/login'>
              <Button size='lg' color='primary' type='button'>
                <FormattedMessage id='signup.login.link' defaultMessage='Log in' />
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
