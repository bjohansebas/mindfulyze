import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import FilterListIcon from '@mui/icons-material/FilterList'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'

function ShowPlacePage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const { credentials } = useAuth()
  const [anchorElPlace, setAnchorElPlace] = useState(null)
  const [anchorElThink, setAnchorElThink] = useState(null)

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
    async function getThinks () {
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

    getThinks()
  }, [])

  const handlePlaceMenu = (event) => {
    if (anchorElPlace) {
      setAnchorElPlace(null)
    } else {
      setAnchorElPlace(event.currentTarget)
    }
  }

  const handleThinkMenu = (event) => {
    if (anchorElThink) {
      setAnchorElThink(null)
    } else {
      setAnchorElThink(event.currentTarget)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
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
          <MenuItem component={Link} key="1" onClick={handlePlaceMenu} to={`/place/${id}/edit`}>Editar lugar</MenuItem>
          <MenuItem component={Link} key="2" onClick={handlePlaceMenu} to={`/place/${id}/delete`}>Borrar lugar</MenuItem>
          <MenuItem key="3" onClick={handlePlaceMenu}>Seleccionar todo</MenuItem>
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
                    <IconButton edge="end" aria-label="comments" onClick={handleThinkMenu}>
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
          <MenuItem key="1" onClick={handleThinkMenu}>Ver pensamiento</MenuItem>
          <MenuItem key="2" onClick={handleThinkMenu}>Mover a la papelera</MenuItem>
          <MenuItem key="3" onClick={handleThinkMenu}>Archivar pensamiento</MenuItem>
        </Menu>
      </Box>
    </Box >
  )
}

export { ShowPlacePage }
