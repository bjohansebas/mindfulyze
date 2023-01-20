import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Toolbar, Typography, Box, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FormattedMessage } from 'react-intl'

import { EMAIL_REGEX, PWD_REGEX, USER_REGEX } from '../../utils/regex'
import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'

function SignUpPage () {
  const { loginPost } = useAuth()
  const navigate = useNavigate()
  const [user, setUser] = useState('')
  const [validUser, setValidUser] = useState(false)

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
    setValidUser(USER_REGEX.test(user))
  })

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd))
    setValidMatch(pwd === matchPwd)
  }, [pwd, matchPwd])

  useEffect(() => {
    setErrMsg('')
  }, [email, pwd, matchPwd])

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (e) => e.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const testUser = USER_REGEX.test(user)
    const testEmail = EMAIL_REGEX.test(email)
    const testPwd = PWD_REGEX.test(pwd)

    if (!testUser || !testEmail || !testPwd) {
      setErrMsg('Invalid Entry')
      setLoading(false)
      return
    }

    try {
      await axios.post('/auth/signup',
        JSON.stringify({
          username: user,
          password: pwd,
          email
        }),
        {
          headers: { 'Content-Type': 'application/json' }
        })
      try {
        await loginPost(email, pwd)
        setLoading(false)
      } catch (e) {
        navigate('/login')
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
        setLoading(false)
      } else if (err.response?.status === 409) {
        setErrMsg('Username or Email taken')
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
                type="text"
                id="outlined-required"
                error={!validUser && user !== ''}
                label={<FormattedMessage id="signup.username" defaultMessage="Username" />}
                onChange={(e) => setUser(e.target.value)}
                arial-invalid={validUser ? 'false' : 'true'}
                required
              />
              <TextField
                type="email"
                id="outlined-required"
                error={!validEmail && email !== ''}
                label={<FormattedMessage id="signup.email" defaultMessage="Email" />}
                onChange={(e) => setEmail(e.target.value)}
                arial-invalid={validUser ? 'false' : 'true'}
                required
              />
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  <FormattedMessage id="signup.password" defaultMessage="Password" />
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  error={!validPwd && pwd !== ''}
                  onChange={(e) => setPwd(e.target.value)}
                  label={<FormattedMessage id="signup.password" defaultMessage="Password" />}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">
                  <FormattedMessage id="signup.confirm" defaultMessage="Confirm password" />
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  error={!validMatch && matchPwd !== ''}
                  disabled={!validPwd}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  label={<FormattedMessage id="signup.confirm" defaultMessage="Confirm password" />}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Button
                disabled={!!(!validPwd || !validEmail || !validMatch || !validUser) || loading}
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
