import { Box, IconButton, SvgIcon, Toolbar } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

import { type Dispatch, type SetStateAction } from 'react'
import { Link } from 'react-router-dom'

import { ReactComponent as LogoIcon } from 'assets/favicon.svg'
import { ReactComponent as TextLogo } from 'assets/text.svg'

export interface HeaderNavigationLoggedProps {
  isOpen: boolean
  settingOpen: Dispatch<SetStateAction<boolean>>
}

export function HeaderNavigationLogged ({ settingOpen, isOpen }: HeaderNavigationLoggedProps): JSX.Element {
  const handleDrawer = (): void => { settingOpen((prevOpen) => !prevOpen) }

  return (
    <Toolbar disableGutters sx={{
      width: '100%',
      height: '58px',
      justifyContent: 'space-between',
      px: '20px'
    }}>
      <IconButton
        onClick={handleDrawer}
        edge='start'
      >
        <MenuRoundedIcon />
      </IconButton>
      <Box component={Link} sx={{ display: 'flex', height: '100%', alignItems: 'center', opacity: isOpen ? 1 : 0 }} to="/">
        <SvgIcon sx={{ height: 32, width: 32 }} viewBox='0 0 32 32'>
          <LogoIcon></LogoIcon>
        </SvgIcon>
        <SvgIcon sx={{ width: 135, height: 14, color: '#000000' }} viewBox='0 0 180 24'>
          <TextLogo></TextLogo>
        </SvgIcon>
      </Box>
    </Toolbar>
  )
}
