import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Toolbar, Typography, Box, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FormattedMessage } from 'react-intl'

// import { useAuth } from '../../hooks/useAuth'

function LoginPage () {
  // const { loginPost } = useAuth()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setErrMsg('')
  }, [email, pwd])

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => event.preventDefault()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // await loginPost(email, pwd)
      setLoading(false)
    } catch (e) {
      setErrMsg(e)
      setLoading(false)
    }
  }

  return (<>
    <Helmet>
      <title>Log in | AlignMind</title>
    </Helmet>
    <Toolbar />
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
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
        minHeight: '480px',
        gap: 3,
        p: '30px',
        borderRadius: '10px'
      }}>
        <Typography variant='h1' sx={{
          fontFamily: 'roboto',
          fontWeight: 700,
          color: 'black',
          letterSpacing: '.2rem',
          fontSize: '1.4em',
          textAlign: 'center',
          mb: '10px'
        }}>
          AlignMind
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              id="outlined"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label={<FormattedMessage id='login.email' defaultMessage="Email" />}
              required
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                <FormattedMessage id="login.password" defaultMessage="Password" />
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                label={<FormattedMessage id="login.password" defaultMessage="Password" />}
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
            <Button type='submit' variant='contained' size='large' disabled={loading}>
              <FormattedMessage id="login.submit" defaultMessage="Log in" />
            </Button>
            <Typography paragraph>{errMsg}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant='h2' sx={{ fontSize: '18px', textAlign: 'center' }}>
            <FormattedMessage id="login.signup.info" defaultMessage="Don't have an account?" />
          </Typography>
          <Button component={Link} variant='outlined' size='large' to='/signup'>
            <FormattedMessage id="login.signup.link" defaultMessage="Sign up" />
          </Button>
        </Box>
      </Box>
    </Box >
  </>)
}

export { LoginPage }
