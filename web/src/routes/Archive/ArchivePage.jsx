import { Box, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Skeleton, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteIcon from '@mui/icons-material/Delete'
import UnarchiveIcon from '@mui/icons-material/Unarchive'

import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'

function ArchivePage () {
  const navigate = useNavigate()
  const { userId, credential } = useAuth()

  const [anchorElTrash, setAnchorElTrash] = useState(null)
  const [checked, setChecked] = useState([])

  const [allArchive, setAllArchive] = useState([])
  const [loading, setLoading] = useState(true)
  const [idSelect, setIdSelect] = useState('')

  const getArchive = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`/users/${userId}/archives`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })
      setAllArchive(response?.data.data.map(data => {
        return { text: data.text_think, id: data.think_id }
      }))
    } catch (e) {
      console.log(e?.response)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getArchive()
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
      await axios.post(`/thinks/${idSelect}/trash`, {}, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      handleToggle(allArchive.findIndex(val => val.id === idSelect))
      await getArchive()
    } catch (err) {
      console.log(err)
    }
  }

  const onUnarchiveId = async () => {
    try {
      setAnchorElTrash(null)
      await axios.put(`/thinks/${idSelect}`, JSON.stringify({
        is_archive: false
      }), {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      handleToggle(allArchive.findIndex(val => val.id === idSelect))
      await getArchive()
    } catch (err) {
      console.log(err)
    }
  }

  const onDeleteSelect = async () => {
    if (checked.length > 0) {
      try {
        for await (const value of checked) {
          const archive = allArchive[value]
          await axios.post(`/thinks/${archive.id}/trash`, {}, {
            headers: {
              Authorization: `Bearer ${credential}`
            }
          })
        }
        setChecked([])
        await getArchive()
      } catch (err) {
        console.log(err)
      }
    }
  }

  const onUnarchiveSelect = async () => {
    if (checked.length > 0) {
      try {
        for await (const value of checked) {
          const archive = allArchive[value]
          await axios.put(`/thinks/${archive.id}`, JSON.stringify({
            is_archive: false
          }), {
            headers: {
              Authorization: `Bearer ${credential}`
            }
          })
        }
        setChecked([])
        await getArchive()
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Box sx={{ width: '100%', p: '30px', height: '100vh' }}>
      <Helmet>
        <title>Archive | AlignMind</title>
      </Helmet>

      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          <FormattedMessage id="archive.title" defaultMessage="Archive" />
        </Typography>
        <Box>
          <IconButton onClick={onUnarchiveSelect} disabled={checked.length === 0}>
            <UnarchiveIcon />
          </IconButton>
          <IconButton onClick={onDeleteSelect} disabled={checked.length === 0}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <Box>
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, pb: '10px' }}>
          {loading && <Skeleton variant="rectangular" height={50} />}

          {!loading && allArchive.map((value, index) => {
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
        </List>
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
          onClick={() => navigate(`/think/${idSelect}`)}>
          <FormattedMessage id="options.think.see" defaultMessage="See thought" />
        </MenuItem>
        <MenuItem
          key="2"
          onClick={onDeleteId}>
          <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />
        </MenuItem>
        <MenuItem
          key="3"
          onClick={onUnarchiveId}>
          <FormattedMessage id="options.think.unarchive" defaultMessage="Unarchive" />
        </MenuItem>
      </Menu>
    </Box >
  )
}

export { ArchivePage }
