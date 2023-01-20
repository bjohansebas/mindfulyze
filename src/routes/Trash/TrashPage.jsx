import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RestoreIcon from '@mui/icons-material/Restore'
import DeleteIcon from '@mui/icons-material/Delete'

import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'

function TrashPage () {
  const navigate = useNavigate()
  const { userId, credentials } = useAuth()
  const [anchorElTrash, setAnchorElTrash] = useState(null)
  const [checked, setChecked] = useState([])
  const [allTrash, setAllTrash] = useState([])
  const [idSelect, setIdSelect] = useState('')

  const getTrash = async () => {
    try {
      const response = await axios.get(`/users/${userId}/trash`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })
      setAllTrash(response?.data.data.map(data => {
        return { text: data.text_think, id: data.trash_th_id }
      }))
    } catch (e) {
      console.log(e?.response)
    }
  }

  useEffect(() => {
    getTrash()
  }, [])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleTrashMenu = (event, id) => {
    if (anchorElTrash) {
      setIdSelect('')
      setAnchorElTrash(null)
    } else {
      setIdSelect(id)
      setAnchorElTrash(event.currentTarget)
    }
  }

  const onDeleteId = async () => {
    try {
      setAnchorElTrash(null)
      await axios.delete(`/trash/${idSelect}`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })

      handleToggle(allTrash.findIndex(val => val.id === idSelect))
      await getTrash()
    } catch (err) {
      console.log(err)
    }
  }

  const onRestoreId = async () => {
    try {
      setAnchorElTrash(null)
      await axios.post(`/trash/${idSelect}`, {}, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })

      handleToggle(allTrash.findIndex(val => val.id === idSelect))
      await getTrash()
    } catch (err) {
      console.log(err)
    }
  }

  const onDeleteSelect = async () => {
    try {
      for await (const value of checked) {
        const trash = allTrash[value]
        await axios.delete(`/trash/${trash.id}`, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })
      }
      setChecked([])
      await getTrash()
    } catch (err) {
      console.log(err)
    }
  }

  const onRestoreSelect = async () => {
    try {
      for await (const value of checked) {
        const trash = allTrash[value]
        await axios.post(`/trash/${trash.id}`, {}, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })
      }
      setChecked([])
      await getTrash()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={{ width: '100%', p: '30px' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          <FormattedMessage id="trash.title" defaultMessage="Trash" />
        </Typography>
        <Box>
          <IconButton onClick={onRestoreSelect}>
            <RestoreIcon />
          </IconButton>
          <IconButton onClick={onDeleteSelect}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Box>
        {allTrash.length >= 1 &&
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, pb: '10px' }}>
            {allTrash.map((value, index) => {
              const labelId = `checkbox-list-label-${index}`
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments" onClick={(e) => { handleTrashMenu(e, value.id) }}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} onClick={handleToggle(index)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(index) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value.text}`} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>}
      </Box>
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
        <MenuItem
          key="1"
          onClick={() => navigate(`/trash/${idSelect}`)}>
          <FormattedMessage id="options.think.see" defaultMessage="See thought" />
        </MenuItem>
        <MenuItem
          key="2"
          onClick={onDeleteId}>
          <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />
        </MenuItem>
        <MenuItem key="3" onClick={onRestoreId}>
          <FormattedMessage id="options.think.restore" defaultMessage="Restore thought" />
        </MenuItem>
      </Menu>
    </Box >
  )
}

export { TrashPage }
