import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { Link, Outlet } from 'react-router-dom'

function SignLayoutPage () {
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
