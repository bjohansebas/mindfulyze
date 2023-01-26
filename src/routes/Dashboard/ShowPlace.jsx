import { Box, List, IconButton, Menu, MenuItem, Typography, ListItem, ListItemButton, ListItemText, Skeleton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import { EmptyPlace } from './EmptyPlace'

function ShowPlaces () {
  const { userId, credential } = useAuth()
  const navigate = useNavigate()

  const [allPlaces, setAllPlaces] = useState([])
  const [loading, setLoading] = useState(true)

  const [anchorEl, setAnchorEl] = useState(null)
  const [idSelect, setIdSelect] = useState('')

  const getPlace = async () => {
    try {
      const response = await axios.get(`/users/${userId}/places`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      const responseColors = await axios.get(`/places/${userId}/colors`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      setAllPlaces(response?.data.data.map(data => {
        const findColor = responseColors?.data.data.find(element => element.color_id === data.color_id)
        return { text: data.name_place, id: data.place_id, color: findColor.code_color }
      }))
    } catch (e) {
      console.log(e?.response)
    } finally {
      setLoading(false)
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
      setLoading(true)
      setAnchorEl(null)
      await axios.delete(`/places/${idSelect}`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })
      await getPlace()
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPlace()
  }, [])

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Typography variant="h2" fontWeight="600" sx={{ fontSize: '1.4em' }}>
        <FormattedMessage id="dashboard.places" defaultMessage="Your places" />
      </Typography>

      <List sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: 2
      }}>
        {loading && <Skeleton variant="rounded" height={68} />}
        {(!loading && allPlaces.length === 0) && <EmptyPlace />}
        {(!loading && allPlaces.length > 0) && allPlaces.map((data, index) => (
          <ListItem
            sx={{ borderRadius: '10px', boxShadow: `0 0 10px #${data?.color}80`, background: '#ffffff' }}
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={(e) => handlePlaceMenu(e, data.id)}>
                <MoreVert />
              </IconButton>
            }
            disablePadding>
            <ListItemButton
              sx={{ py: '20px', borderRadius: '10px' }}
              role={undefined}
              dense
              onClick={() => { navigate(`/place/${data?.id}`) }}>
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
        <MenuItem
          key="1"
          onClick={onDelete}
        >
          <FormattedMessage id="options.delete.place" defaultMessage="Delete place" />
        </MenuItem>
        <MenuItem
          key="2"
          onClick={() => navigate(`/place/${idSelect}/edit`)}>
          <FormattedMessage id="options.edit.place" defaultMessage="Edit place" />
        </MenuItem>
      </Menu>
    </Box>
  )
}

export { ShowPlaces }
