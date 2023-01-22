import { Box, Menu, MenuItem, Drawer as MuiDrawer, IconButton, Avatar, Fab, Typography, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Toolbar } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Menu as MenuIcon, ArrowDropDown as ArrowDropDownIcon, Archive as ArchiveIcon, Delete as DeleteIcon, Dashboard as DashboardIcon, Add as AddIcon, Logout as LogoutIcon } from '@mui/icons-material'

import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const drawerWidth = 210

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
  { text: <FormattedMessage id="menu.list.dashboard" defaultMessage="Dashboard" />, route: '/dashboard', icon: <DashboardIcon /> },
  { text: <FormattedMessage id="menu.list.trash" defaultMessage="Trash" />, route: '/trash', icon: <DeleteIcon /> },
  { text: <FormattedMessage id="menu.list.archive" defaultMessage="Archive" />, route: '/archive', icon: <ArchiveIcon /> }
]

function MenuApp () {
  const navigate = useNavigate()
  // const { logoutEvent } = useAuth()
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
        <Toolbar sx={{
          px: 2.5
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              to='/dashboard'
            >
              AlignMind
            </Typography>
          </Box>
        </Toolbar>

        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', pb: '30px' }}>
          <Box>
            <Box sx={{ ml: open ? 2.5 : 0.4, mt: 2 }}>
              <Fab color="primary" aria-label="add" onClick={handleCreateMenu} sx={{ ...(open && { display: 'none' }) }}>
                <AddIcon />
              </Fab>
              <Fab variant='extended' color="primary" onClick={handleCreateMenu} sx={{ gap: 1, ...(!open && { display: 'none' }) }}>
                <AddIcon />
                <FormattedMessage id="menu.add" defaultMessage="Create" />
                <ArrowDropDownIcon />
              </Fab>
              <Menu
                sx={{ ml: open ? '150px' : '48px', zIndex: 1202 }}
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
                <MenuItem component={Link} key={1} to="/think/new">
                  <Typography textAlign="center">
                    <FormattedMessage id="menu.add.think" defaultMessage="New think" />
                  </Typography>
                </MenuItem>
                <MenuItem component={Link} key={2} to="/place/new">
                  <Typography textAlign="center">
                    <FormattedMessage id="menu.add.place" defaultMessage="New place" />
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>

            <List>
              {pageLogin.map((text, index) => (
                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                  <ListItemButton
                    component={Link}
                    selected={pathNow === text.route}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5
                    }}
                    onClick={() => setOpen(false)}
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
                    <Avatar />
                  </ListItemIcon>
                  <ListItemText primary={<FormattedMessage id="menu.account" defaultMessage="Account" />} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </List>
            <Menu
              sx={{ ml: open ? '120px' : '44px' }}
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
              <MenuItem key={1} onClick={() => {
                setOpen(false)
                handleUserMenu()
                navigate('/account')
              }}>
                <ListItemIcon>
                  <Avatar sx={{ width: '24px', height: '24px' }} />
                </ListItemIcon>

                <Typography>
                  <FormattedMessage id="menu.account.profile" defaultMessage="Profile" />
                </Typography>
              </MenuItem>
              <MenuItem
                key={2}
              // onClick={logoutEvent}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="medium" />
                </ListItemIcon>

                <Typography textAlign="center">
                  <FormattedMessage id="menu.account.logout" defaultMessage="Logout" />
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Drawer>
    </>
  )
}

export { MenuApp }
