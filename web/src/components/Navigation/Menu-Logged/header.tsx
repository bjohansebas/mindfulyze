import { Box, IconButton, Toolbar } from '@mui/material'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'

import { type Dispatch, type SetStateAction } from 'react'

import { Banner } from '@/components/Banner'

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
      <Box sx={{ opacity: isOpen ? 1 : 0 }}>
        <Banner></Banner>
      </Box>
    </Toolbar>
  )
}
