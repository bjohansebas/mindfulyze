import { AppBar, Container, Box, Toolbar, Typography } from '@mui/material'

import localforage from 'localforage'
import { useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'

function SignLayoutPage () {
  const navigate = useNavigate()

  useEffect(() => {
    async function existUser () {
      const credential = await localforage.getItem('credentials_token')
      const userId = await localforage.getItem('userInfo_userId')
      if (credential && userId) {
        return navigate('/', { replace: true })
      }
    }
    existUser()
  })

  return (
    <Box>
      <AppBar sx={{
        backgroundColor: '#fcfcfc',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
      }}>
        <Container >
          <Toolbar disableGutters>
            <Typography
              component={Link}
              noWrap
              sx={{
                display: 'flex',
                fontFamily: 'roboto',
                fontWeight: 700,
                color: 'black',
                letterSpacing: '.2rem',
                textDecoration: 'none'
              }}
              to='/'
            >
              AlignMind
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </Box>
  )
}

export { SignLayoutPage }
