import { Box, Button } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { FormattedMessage } from 'react-intl'

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Banner } from '@/components/Banner'
import { EmailField } from '@/components/Fields/Email'
import { useApp } from '@/hooks/useApp'
import { PasswordTextField } from 'components/Fields/Password'
export function LoginPage(): JSX.Element {
  const navigate = useNavigate()
  const { loginAction } = useApp()

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
    <>
      <Helmet>
        <title>Log in | Mindfulyze</title>
      </Helmet>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(45deg, #00575C 0%, #002d32 100%)',
          backgroundPosition: '0 0',
          backgroundSize: '100% 100%',
          py: { sm: '40px', xs: '0' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: ' center',
            flexDirection: 'column',
            width: { xs: '90%', sm: '60%', md: '50%', lg: '40%' },
            gap: 4,
            p: { sm: '40px 32px', xs: '40px 16px' },
            borderRadius: '12px',
          }}
        >
          <header className='flex items-center gap-6 flex-col text-white'>
            <Banner widthFavicon={40} heightText={24.26} widthText={230} />
            <div className='w-full px-2 gap-2 flex flex-col'>
              <h1 className='text-3xl font-extrabold'>Log in</h1>
              <h2 className='text-xl font-semibold'>Welcome back! Please enter your details.</h2>
            </div>
          </header>
          <Box
            component='form'
            autoComplete='off'
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <EmailField
                text={email}
                setText={setEmail}
                label={<FormattedMessage id='login.email' defaultMessage='Email' />}
                errorRequest=''
              />
              <PasswordTextField
                text={pwd}
                setText={setPwd}
                label={<FormattedMessage id='login.password' defaultMessage='Password' />}
                errorRequest=''
              />
            </Box>
            <Box display='flex' sx={{ gap: { sm: '32px', xs: '16px' }, flexDirection: { xs: 'column', sm: 'row' } }}>
              <Button
                type='submit'
                variant='contained'
                size='large'
                disabled={loading}
                sx={{ width: '100%', borderRadius: '12px' }}
              >
                <FormattedMessage id='login.submit' defaultMessage='Log in' />
              </Button>
              <Button
                component={Link}
                variant='outlined'
                size='large'
                to='/signup'
                sx={{ width: { sm: '160px', sx: '100%' }, borderRadius: '12px' }}
              >
                <FormattedMessage id='login.signup.link' defaultMessage='Sign up' />
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>{' '}
    </>
  )
}
