import { Box, Drawer as MuiDrawer } from '@mui/material'
import { styled, type CSSObject, type Theme } from '@mui/material/styles'

import ArchiveRoundedIcon from '@mui/icons-material/ArchiveRounded'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

import { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useLocation } from 'react-router-dom'

import { HeaderNavigationLogged } from './header'
import { ListNavigationLogged } from './listMenu'

const drawerWidth = 260

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '70px',
})

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(
  ({ theme, open }) => ({
    width: drawerWidth,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open === true && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(open === false && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
) as typeof MuiDrawer

const pageLogin = [
  {
    text: <FormattedMessage id='menu.list.dashboard' defaultMessage='Dashboard' />,
    route: '/',
    icon: <DashboardRoundedIcon />,
  },
  {
    text: <FormattedMessage id='menu.list.trash' defaultMessage='Trash' />,
    route: '/trash',
    icon: <DeleteRoundedIcon />,
  },
  {
    text: <FormattedMessage id='menu.list.archive' defaultMessage='Archive' />,
    route: '/archive',
    icon: <ArchiveRoundedIcon />,
  },
]

const settings = [
  {
    text: <FormattedMessage id='menu.account.setting' defaultMessage='Settings' />,
    route: '/account',
    icon: <SettingsRoundedIcon />,
  },
  {
    text: <FormattedMessage id='menu.account.logout' defaultMessage='Logout' />,
    route: '/logout',
    icon: <LogoutRoundedIcon />,
  },
]

export function MenuLogged(): JSX.Element {
  const location = useLocation()

  const [open, setOpen] = useState<boolean>(false)
  const pathNow: string = location.pathname

  return (
    <Drawer variant='permanent' open={open}>
      <Box
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: '6px',
          px: '8px',
        }}
      >
        <Box>
          <HeaderNavigationLogged settingOpen={setOpen} isOpen={open} />
          <ListNavigationLogged isOpen={open} listButtons={pageLogin} path={pathNow} />
        </Box>
        <Box>
          <ListNavigationLogged isOpen={open} listButtons={settings} path={pathNow} />
        </Box>
      </Box>
    </Drawer>
  )
}
