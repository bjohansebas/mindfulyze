import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Toolbar, Typography, Box, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import axios from '../../api/axios'

function LoginPage () {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    setErrMsg('')
  }, [email, pwd])

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/auth/login',
        JSON.stringify({
          email,
          password: pwd
        }), {
          headers: { 'Content-Type': 'application/json' }
        }
      )

      setAuth({ email })
      setEmail('')
      setPwd('')
      setSuccess(true)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No server response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login failed')
      }
    }
  }

  useEffect(() => {
    if (success) {
      navigate('/home')
    }
  }, [success])

  return (<>
    <Toolbar />
    <Box
      sx={{
        height: '100vh',
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
        <Typography variant='h1' sx={{ fontSize: '1.4em', textAlign: 'center', mb: '10px' }}>Crear tu cuenta en AlingMind</Typography>
        <Box
          component="form"
          autoComplete="off"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              id="outlined-required"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              label="Correo electronico"
              placeholder="Correo electronico"
              required
            />
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                label="Contraseña"
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
            <Button type='submit' variant='contained' size='large'>Inicia Sesión</Button>
          </Box>
        </Box>
        <Box sx={{
          display: 'flex', flexDirection: 'column', gap: 2
        }}>
          <Typography variant='h2' sx={{ fontSize: '18px', textAlign: 'center' }}>¿Aun no tienes cuenta?</Typography>
          <Button component={Link} variant='outlined' size='large' to='/signup'>Registrate</Button>
        </Box>
      </Box>
    </Box >
  </>)
}

export { LoginPage }
