import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FilterListIcon from '@mui/icons-material/FilterList'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'
import { useNavigate, useParams } from 'react-router-dom'

function ShowPlacePage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const { credentials } = useAuth()
  const [anchorElPlace, setAnchorElPlace] = useState(null)
  const [anchorElThink, setAnchorElThink] = useState(null)
  const [idSelect, setIdSelect] = useState('')
  const [namePlace, setNamePlace] = useState('')
  const [allThink, setAllThink] = useState([])

  useEffect(() => {
    async function getPlace () {
      try {
        const responsePlace = await axios.get(`/places/${id}`, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })
        setNamePlace(responsePlace?.data.data.name_place)
      } catch (err) {
        if (!err?.response) {
          console.log('Server not response')
        } else if (err.response?.status === 404) {
          navigate('/dashboard')
        } else {
          console.log('error aqui')
        }
      }
    }
    getPlace()
  }, [])

  useEffect(() => {
    getThinks()
  }, [])

  const getThinks = async () => {
    try {
      const response = await axios.get(`/places/${id}/thinks`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })

      setAllThink(response?.data.data.map(data => {
        return { text: data.text_think, id: data.think_id }
      }))
    } catch (err) {
      if (!err?.response) {
        return 'No server response'
      } else if (err.response?.status === 404) {
        navigate('/dashboard')
      }
    }
  }

  const handlePlaceMenu = (event) => {
    if (anchorElPlace) {
      setAnchorElPlace(null)
    } else {
      setAnchorElPlace(event.currentTarget)
    }
  }

  const handleThinkMenu = (event, id) => {
    if (anchorElThink) {
      setIdSelect('')
      setAnchorElThink(null)
    } else {
      setIdSelect(id)
      setAnchorElThink(event.currentTarget)
    }
  }

  const onDelete = async () => {
    setAnchorElThink(null)
    try {
      await axios.post(`/thinks/${idSelect}/trash`, {}, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })

      await getThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onDeletePlace = async () => {
    setAnchorElPlace(null)
    try {
      await axios.delete(`/places/${id}`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })

      navigate('/dashboard')
    } catch (err) {
      console.log(err)
    }
  }

  const onArchive = async () => {
    setAnchorElThink(null)
    try {
      await axios.put(`/thinks/${idSelect}/`,
        JSON.stringify({
          is_archive: true
        }), {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })

      await getThinks()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
        >
          {namePlace}
        </Typography>
        <IconButton onClick={handlePlaceMenu}
          aria-label="more"
          id="long-button"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          sx={{ mt: '40px', zIndex: 1202 }}
          id="menu-appbar"
          anchorEl={anchorElPlace}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElPlace)}
          onClose={handlePlaceMenu}
        >
          <MenuItem key="1" onClick={() => navigate(`/place/${id}/edit`)}>Editar lugar</MenuItem>
          <MenuItem key="2" onClick={onDeletePlace}>Borrar lugar</MenuItem>
        </Menu>
      </Toolbar>
      <Box sx={{ p: '30px' }}>
        <Toolbar sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0, 0 ,0, 0.12)', gap: 1, borderRadius: '10px 10px 0 0' }}>
          <Button variant="text" startIcon={<FilterListIcon />}>Filtros</Button>
          <Button variant="text" startIcon={<SwapVertIcon />}>Ordenar</Button>
        </Toolbar>
        {allThink.length >= 1 &&
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, pb: '10px' }}>
            {allThink.map((value, index) => {
              return (
                <ListItem
                  sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                  key={index}
                  secondaryAction={
                    <IconButton edge="end" aria-label="comments" onClick={(e) => handleThinkMenu(e, value.id)}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton role={undefined} dense onClick={() => { navigate(`/think/${value.id}`) }}>
                    <ListItemText primary={`${value?.text}`} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>}
        <Menu
          sx={{ mt: '40px', zIndex: 1202 }}
          id="menu-appbar"
          anchorEl={anchorElThink}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorElThink)}
          onClose={handleThinkMenu}
        >
          <MenuItem key="1" onClick={() => navigate(`/think/${idSelect}`)}>Ver pensamiento</MenuItem>
          <MenuItem key="2" onClick={onDelete}>Mover a la papelera</MenuItem>
          <MenuItem key="3" onClick={onArchive}>Archivar pensamiento</MenuItem>
        </Menu>
      </Box>
    </Box >
  )
}

export { ShowPlacePage }
