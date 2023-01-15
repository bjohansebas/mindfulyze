import { Box, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { useState } from 'react'

function ShowThinkTrashPage () {
  const [anchorElTrash, setAnchorElTrash] = useState(null)

  const handleTrashMenu = (event) => {
    if (anchorElTrash) {
      setAnchorElTrash(null)
    } else {
      setAnchorElTrash(event.currentTarget)
    }
  }
  return (<Box>
    <Toolbar sx={{ display: 'flex', justifyContent: 'center' }}>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        Papelera
      </Typography>
      <IconButton onClick={handleTrashMenu}
        aria-label="more"
        id="long-button"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        sx={{ mt: '40px', zIndex: 1202 }}
        id="menu-appbar"
        anchorEl={anchorElTrash}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElTrash)}
        onClose={handleTrashMenu}
      >
        <MenuItem key="1" onClick={handleTrashMenu}>Eliminar lugar</MenuItem>
        <MenuItem key="2" onClick={handleTrashMenu}>Editar lugar</MenuItem>
      </Menu>

    </Toolbar>
  </Box >
  )
}

export { ShowThinkTrashPage }
