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

  useEffect(() => {
    async function getPlace () {
      try {
        const response = await axios.get(`/users/${userId}/places`, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })
        setAllPlaces(response?.data.data.map(data => {
          return { text: data.name_place, id: data.place_id, color: data.color_id }
        }))
      } catch (e) {
        console.log(e?.response)
      }
    }

    getPlace()
  }, [])

  const handlePlaceMenu = (event) => {
    if (anchorEl) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }
  return (
    <Box
      component="main"
      sx={{ width: '100%', px: '30px', py: '15px' }}>
      <Box component="header" sx={{ my: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h1" fontWeight="700" sx={{ fontSize: '1.4em', textAlign: 'center' }}>Bienvenido, {userInfo?.firstName} {userInfo?.lastName}</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={3}>
        <Typography variant="h2" fontWeight="600" sx={{ fontSize: '1.4em' }}>Tus lugares</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          {allPlaces.map(data => (
            <Box key={data.text} sx={{ height: '30px', py: '30px', px: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', cursor: 'pointer', borderRadius: '10px', color: '#000000', textDecoration: 'none' }} to={`/place/${data?.id}`}>
              <Box component={Link} to={`/place/${data?.id}`} sx={{ width: '100%' }}>
                <p>{data.text}</p>
              </Box>
              <div>
                <IconButton onClick={handlePlaceMenu}
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
            <MenuItem key="1" onClick={handlePlaceMenu}>Eliminar lugar</MenuItem>
            <MenuItem key="2" onClick={handlePlaceMenu}>Editar lugar</MenuItem>

          </Menu>
        </Box>
      </Box>
    </Box >)
}

export { DashboardPage }
