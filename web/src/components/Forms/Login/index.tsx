import { Button, Box, Paper } from '@mui/material'
import { FormattedMessage } from 'react-intl'

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useAuth } from 'hooks/useAuth'
import { PasswordTextField } from 'components/Fields/Password'
import { HeaderFormLogin } from './HeaderForm'
import { EmailField } from '@/components/Fields/Email'

export function LoginForm(): JSX.Element {
  const navigate = useNavigate()
  const { loginAction } = useAuth()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

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
    <>
      <Box
        sx={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundImage: 'url(src/assets/wave.png)',
          backgroundPosition: '0 0',
          backgroundSize: '100% 100%'
        }}
      >
        <Paper elevation={6} sx={{
          display: 'flex',
          justifyContent: ' center',
          flexDirection: 'column',
          width: { lg: '552px', md: '452', xs: '352' },
          gap: 4,
          p: { md: '40px 32px', xs: '20px 16px' },
          borderRadius: '12px'
        }}>
          <HeaderFormLogin />
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <EmailField
                text={email}
                setText={setEmail}
                label={<FormattedMessage id="login.email" defaultMessage="Email" />}
                errorRequest=''
              />
              <PasswordTextField
                text={pwd}
                setText={setPwd}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                label={<FormattedMessage id="login.password" defaultMessage="Password" />}
                errorRequest=''
              />
            </Box>
            <Box display="flex" sx={{ gap: '32px' }}>
              <Button type='submit' variant='contained' size='large' disabled={loading} sx={{ width: '100%', borderRadius: '12px' }}>
                <FormattedMessage id="login.submit" defaultMessage="Log in" />
              </Button>
              <Button component={Link} variant='outlined' size='large' to='/signup' sx={{ width: '160px', borderRadius: '12px' }}>
                <FormattedMessage id="login.signup.link" defaultMessage="Sign up" />
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box >
    </>
  )
}
