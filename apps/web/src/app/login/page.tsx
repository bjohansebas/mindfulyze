import { Button } from '@nextui-org/react'

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FormattedMessage } from 'react-intl'

import { Banner } from '@/components/Banner'
import { EmailField } from '@/components/Fields/Email'
import { PasswordTextField } from 'components/Fields/Password'

import { useApp } from '@/hooks/useApp'
import LayoutLogin from './layout'

export const LoginPage = (): JSX.Element => {
  const navigate = useNavigate()
  const { loginAction } = useApp()

  const [email, setEmail] = useState<string | undefined>('')
  const [pwd, setPwd] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      if (email == null) return
      await loginAction(email, pwd)
      navigate('/')
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <LayoutLogin>
      <div className='min-h-screen w-screen flex justify-center items-center flex-col sm:py-10'>
        <div className='shadow-xl border flex justify-center flex-col gap-8 rounded-xl max-w-[90%] sm:max-w-[60%] md:max-w-[50%] lg:max-w-[40%] py-10 px-8 max-[640px]:px-4'>
          <header className='flex items-center gap-6 flex-col text-primary-800'>
            <Link to='/'>
              <Banner widthFavicon={40} heightText={24.26} widthText={230} />
            </Link>
            <div className='w-full px-2 gap-2 flex flex-col'>
              <h1 className='text-3xl font-extrabold'>Log in</h1>
              <h2 className='text-xl font-semibold'>Welcome back! Please enter your details.</h2>
            </div>
          </header>
          <form autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-8'>
            <div className='flex flex-col gap-4'>
              <EmailField
                text={email}
                setText={setEmail}
                label={<FormattedMessage id='login.email' defaultMessage='Email' />}
              />
              <PasswordTextField
                text={pwd}
                setText={setPwd}
                label={<FormattedMessage id='login.password' defaultMessage='Password' />}
              />
            </div>
            <div className='flex gap-4 max-[640px]:gap-4 flex-row max-[640px]:flex-col'>
              <Button type='submit' color='primary' variant='solid' size='lg' disabled={loading} className='w-full'>
                <FormattedMessage id='login.submit' defaultMessage='Log in' />
              </Button>
              <Link to='/signup'>
                <Button size='lg' color='primary'>
                  <FormattedMessage id='login.signup.link' defaultMessage='Sign up' />
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </LayoutLogin>
  )
}

export default LoginPage
