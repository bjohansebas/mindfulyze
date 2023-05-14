import { Button, Box } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from 'hooks/useAuth'
import { PasswordTextField } from 'components/Fields/Password'
import { HeaderFormLogin } from './HeaderForm'
import { EmailField } from '@/components/Fields/Email'

import backgroundImage from '@/assets/background.png'

export function LoginForm(): JSX.Element {
  const navigate = useNavigate()
  const { loginAction } = useAuth()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setLoading(true)
    try {
      await loginAction(email, pwd)
      navigate('/')
    } catch (e) {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: { sm: 'center', xs: 'normal' },
        flexDirection: 'column',
        backgroundImage: { xs: 'paper', sm: `url(${backgroundImage})` },
        backgroundPosition: '0 0',
        backgroundSize: '100% 100%',
        py: { sm: '40px', xs: '0' }
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: ' center',
        flexDirection: 'column',
        width: { lg: '552px', md: '452', xs: '330' },
        gap: 4,
        p: { sm: '40px 32px', xs: '40px 16px' },
        borderRadius: '12px',
        background: '#ffffff'
      }}>
        <HeaderFormLogin />
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <EmailField
              text={email}
              setText={setEmail}
              label={<FormattedMessage id="login.email" defaultMessage="Email" />}
              errorRequest=''
            />
            <PasswordTextField
              text={pwd}
              setText={setPwd}
              label={<FormattedMessage id="login.password" defaultMessage="Password" />}
              errorRequest=''
            />
          </Box>
          <Box display="flex" sx={{ gap: { sm: '32px', xs: '16px' }, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button type='submit' variant='contained' size='large' disabled={loading} sx={{ width: '100%', borderRadius: '12px' }}>
              <FormattedMessage id="login.submit" defaultMessage="Log in" />
            </Button>
            <Button component={Link} variant='outlined' size='large' to='/signup' sx={{ width: { sm: '160px', sx: '100%' }, borderRadius: '12px' }}>
              <FormattedMessage id="login.signup.link" defaultMessage="Sign up" />
            </Button>
          </Box>
        </Box>
      </Box>
    </Box >
  )
}
