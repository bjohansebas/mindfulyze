import { Button, Toolbar, Typography, Box, TextField } from '@mui/material'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FormattedMessage } from 'react-intl'

import { EMAIL_REGEX, PWD_REGEX } from '../../utils/regex'
import { TextFieldPassword } from '../../components/TextFieldPassword'
import { useAuth } from '../../hooks/useAuth'
import { postSignUpAccount } from '../../services/signUp'

function SignUpPage () {
  const { loginAction } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [email, pwd, matchPwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const testEmail = EMAIL_REGEX.test(email)
    const testPwd = PWD_REGEX.test(pwd)

    if (!testEmail || !testPwd) {
      setErrMsg('Invalid Entry')
      setLoading(false)
      return
    }

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
      if (!err?.response) {
        setErrMsg('No Server Response')
        setLoading(false)
      } else if (err.response?.status === 404) {
        setErrMsg('Email taken')
        setLoading(false)
      } else {
        setErrMsg('Registration failed')
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Sign up | AlignMind</title>
      </Helmet>
      <Toolbar />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          py: '20px',
          mx: { sm: '10px', md: 0 }
        }}
      >
        <Box sx={{
          background: '#ffffff',
          display: 'flex',
          justifyContent: ' center',
          flexDirection: 'column',
          width: { sm: '340px', md: '450px' },
          gap: 3,
          p: '30px',
          borderRadius: '10px'
        }}>
          <Typography variant='h1' sx={{ fontSize: '1.4em', textAlign: 'center', mb: '10px' }}>
            <FormattedMessage id="signup.title" defaultMessage="Create your account on AlingMind" />
          </Typography>
          <Box
            component="form"
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

              <TextField
                type="email"
                id="outlined-required"
                error={!validEmail && email !== ''}
                label={<FormattedMessage id="signup.email" defaultMessage="Email" />}
                onChange={(e) => setEmail(e.target.value)}
                arial-invalid={validEmail ? 'false' : 'true'}
                required
              />
              <TextFieldPassword
                pwd={pwd}
                setPwd={setPwd}
                validPwd={validPwd}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                label={<FormattedMessage id="signup.password" defaultMessage="Password" />}
              />
              <TextFieldPassword
                pwd={matchPwd}
                setPwd={setMatchPwd}
                validPwd={validMatch}
                isDisable={!validPwd}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                label={<FormattedMessage id="signup.confirm" defaultMessage="Confirm password" />}
              />
              <Button
                disabled={!!(!validPwd || !validEmail || !validMatch) || loading}
                type='submit' variant='contained' size='large'>
                <FormattedMessage id="signup.submit" defaultMessage="Sign up" />
              </Button>
              <Typography paragraph>{errMsg}</Typography>
            </Box>
          </Box>
          <Box sx={{
            display: 'flex', flexDirection: 'column', gap: 2
          }}>
            <Typography variant='h2' sx={{ fontSize: '18px', textAlign: 'center' }}>
              <FormattedMessage id="signup.login.info" defaultMessage="Have an account?" />
            </Typography>
            <Button component={Link} variant='outlined' size='large' to='/login'>
              <FormattedMessage id="signup.login.link" defaultMessage="Log in" />
            </Button>
          </Box>
        </Box>
      </Box >
    </>
  )
}

export { SignUpPage }
