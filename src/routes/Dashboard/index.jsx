import { Box, List, IconButton, Menu, MenuItem, Typography, ListItem, ListItemButton, ListItemText } from '@mui/material'
import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

function DashboardPage () {
  const navigate = useNavigate()
  const { userInfo, userId, credentials } = useAuth()
  const [anchorEl, setAnchorEl] = useState(null)
  const [allPlaces, setAllPlaces] = useState([])
  const [idSelect, setIdSelect] = useState('')

  useEffect(() => {
    getPlace()
  }, [])

  const getPlace = async () => {
    try {
      const response = await axios.get(`/users/${userId}/places`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })
      const responseColors = await axios.get(`/places/${userId}/colors`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })
      setAllPlaces(response?.data.data.map(data => {
        const findColor = responseColors?.data.data.find(element => element.color_id === data.color_id)
        return { text: data.name_place, id: data.place_id, color: findColor.code_color }
      }))
    } catch (e) {
      console.log(e?.response)
    }
    try {
      const response = await axios.get(`/users/${userId}/places`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })
      const responseColors = await axios.get(`/places/${userId}/colors`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })

      setAllPlaces(response?.data.data.map(data => {
        const findColor = responseColors?.data.data.find(element => element.color_id === data.color_id)
        return { text: data.name_place, id: data.place_id, color: findColor.code_color }
      }))
    } catch (e) {
      console.log(e?.response)
    }
  }

  const handlePlaceMenu = (event, id) => {
    if (anchorEl) {
      setIdSelect('')
      setAnchorEl(null)
    } else {
      setIdSelect(id)
      setAnchorEl(event.currentTarget)
    }
  }

  const onDelete = async () => {
    try {
      setAnchorEl(null)
      await axios.delete(`/places/${idSelect}`, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })
      await getPlace()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Box
      component="main"
      sx={{ width: '100%', px: { xs: '20px', sm: '50px', md: '100px' }, py: '20px' }}>
      <Box component="header" sx={{ my: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h1" fontWeight="700" sx={{ fontSize: '1.4em', textAlign: 'center' }}>Bienvenido, {userInfo?.firstName} {userInfo?.lastName}</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h2" fontWeight="600" sx={{ fontSize: '1.4em' }}>Tus lugares</Typography>
        <List sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2
        }}>
          {allPlaces.map((data, index) => (
            <ListItem
              sx={{ borderRadius: '10px', boxShadow: `0 0 10px #${data?.color}80`, background: '#ffffff' }}
              key={index}
              secondaryAction={
                <IconButton edge="end" aria-label="comments" onClick={(e) => handlePlaceMenu(e, data.id)}>
                  <MoreVertIcon />
                </IconButton>
              }
              disablePadding>
              <ListItemButton sx={{ py: '20px', borderRadius: '10px' }} role={undefined} dense onClick={() => { navigate(`/place/${data?.id}`) }}>
                <ListItemText primary={`${data?.text}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Menu
          sx={{ mt: '40px', zIndex: 1202 }}
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={Boolean(anchorEl)}
          onClose={handlePlaceMenu}
        >
          <MenuItem key="1" onClick={onDelete}>Eliminar lugar</MenuItem>
          <MenuItem key="2" onClick={() => navigate(`/place/${idSelect}/edit`)}>Editar lugar</MenuItem>
        </Menu>
      </Box>
    </Box >)
}

export { DashboardPage }
