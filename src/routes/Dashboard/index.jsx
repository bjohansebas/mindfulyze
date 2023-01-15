import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

function DashboardPage () {
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
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
          gap: 2
        }}>
          {allPlaces.map(data => (
            <Box key={data.text} sx={{ height: '30px', py: '30px', px: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer', borderRadius: '10px', boxShadow: `0 0 10px #${data?.color}80` }} to={`/place/${data?.id}`}>
              <Box component={Link} to={`/place/${data?.id}`} sx={{ width: '100%', color: '#000000', textDecoration: 'none' }}>
                <p>{data.text}</p>
              </Box>
              <div>
                <IconButton onClick={(e) => { handlePlaceMenu(e, data.id) }}
                  aria-label="more"
                  id="long-button"
                >
                  <MoreVertIcon />
                </IconButton>
              </div>
            </Box>)
          )}
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
            <MenuItem key="2" onClick={handlePlaceMenu}>Editar lugar</MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box >)
}

export { DashboardPage }
