import { AppBar, Box, Menu, MenuItem, Drawer as MuiDrawer, Container, Button, Toolbar, IconButton, Avatar, Fab, Typography, List, ListItem, ListItemIcon, ListItemButton, ListItemText } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import { Menu as MenuIcon, ArrowDropDown as ArrowDropDownIcon, Archive as ArchiveIcon, Delete as DeleteIcon, Dashboard as DashboardIcon, Add as AddIcon } from '@mui/icons-material'
import { styled } from '@mui/material/styles'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const StyledToolbar = styled(Toolbar)(() => ({
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'space-between'
}))

function MenuNavUnLogin () {
  const location = useLocation()
  const pathNow = location.pathname

  const pages = [{ text: 'Iniciar sesión', route: 'login' }, { text: 'Crear una cuenta', route: 'signup' }]
  return (
    <AppBar sx={{ backgroundColor: '#fcfcfc', boxShadow: 'none', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
      <Container >
        <StyledToolbar disableGutters>
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
            Align Mind
          </Typography>
          {(pathNow === '/') &&
            <Box sx={{ display: 'flex', gap: 3 }}>
              {pages.map((page) => (
                <Button
                  key={page.route}
                  component={Link}
                  sx={{ display: { xs: page.route === 'signup' ? 'none' : 'block', sm: 'block' } }}
                  to={`${page.route}`}
                >
                  {`${page.text}`}
                </Button>
              ))}
            </Box>
          }
        </StyledToolbar>
      </Container>
    </AppBar>
  )
}

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 7px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme)
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    })
  })
)

const pageLogin = [
  { text: 'Dashboard', route: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Papelera', route: '/trash', icon: <DeleteIcon /> },
  { text: 'Archivados', route: '/archive', icon: <ArchiveIcon /> }
]

const settings = ['Profile', 'Logout']

function MenuNavLogin () {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [anchorElCreate, setAnchorElCreate] = useState(null)
  const pathNow = location.pathname

  const handleDrawer = () => {
    setOpen(!open)
  }

  const handleUserMenu = (event) => {
    if (anchorElUser) {
      setAnchorElUser(null)
    } else {
      setAnchorElUser(event.currentTarget)
    }
  }

  const handleCreateMenu = (event) => {
    if (anchorElCreate) {
      setAnchorElCreate(null)
    } else {
      setAnchorElCreate(event.currentTarget)
    }
  }

  return (
    <>
      <Drawer variant="permanent" open={open}>
        <StyledToolbar sx={{
          px: 2.5
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawer}
              edge='start'
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={Link}
              noWrap
              sx={{
                display: open ? 'flex' : 'none',
                fontFamily: 'roboto',
                fontWeight: 700,
                color: 'black',
                letterSpacing: '.2rem',
                textDecoration: 'none'
              }}
              to='/home'
            >
              Align Mind
            </Typography>
          </Box>
        </StyledToolbar>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', pb: '30px' }}>
          <Box>
            <Box sx={{ ml: open ? 2.5 : 0.4, mt: 2 }}>
              <Fab color="primary" aria-label="add" onClick={handleCreateMenu} sx={{ ...(open && { display: 'none' }) }}>
                <AddIcon />
              </Fab>
              <Fab variant='extended' color="primary" onClick={handleCreateMenu} sx={{ ...(!open && { display: 'none' }) }}>
                <AddIcon />
                Crear
                <ArrowDropDownIcon />
              </Fab>
              <Menu
                sx={{ mt: '40px', zIndex: 1202 }}
                id="menu-appbar"
                anchorEl={anchorElCreate}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElCreate)}
                onClose={handleCreateMenu}
              >
                {[{ text: 'Crear Pensamiento', route: '/think/new' }, { text: 'Crear Lugar', route: '/place/new' }].map((options) => (
                  <MenuItem component={Link} key={options.text} onClick={handleCreateMenu} to={`${options.route}`}>
                    <Typography textAlign="center">{options.text}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <List>
              {pageLogin.map((text) => (
                <ListItem key={text.text} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    component={Link}
                    selected={pathNow === text.route}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5
                    }}
                    to={text.route}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center'
                      }}
                    >
                      {text.icon}
                    </ListItemIcon>
                    <ListItemText primary={text.text} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <List>
              <ListItem key="config" disablePadding sx={{ display: 'block' }} onClick={handleUserMenu}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center'
                    }}
                  >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </ListItemIcon>
                  <ListItemText primary="Cuenta" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </List>

            <Menu
              sx={{ mb: '150px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

function MenuNav () {
  const { isLogin } = useAuth()
  return (
    <>
      {isLogin && <MenuNavLogin />}
      {!isLogin && <MenuNavUnLogin />}
    </>
  )
}
export { MenuNav }
