import { Box, IconButton, Menu, MenuItem, Skeleton, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet-async'

import { useAuth } from '../../../hooks/useAuth'
import { ShowThinks } from './ShowThinks'
import { deletePlace, getPlace } from '../../../services/place'

function ShowPlacePage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const { credential } = useAuth()
  const [anchorElPlace, setAnchorElPlace] = useState(null)
  const [loading, setLoading] = useState(false)

  const [namePlace, setNamePlace] = useState('')

  useEffect(() => {
    async function getRequestPlace () {
      try {
        const responsePlace = await getPlace(id, credential)

        setNamePlace(responsePlace.name)
      } catch (err) {
        if (!err?.response) {
          console.log('Server not response')
        } else if (err.response?.status === 404) {
          navigate('/')
        } else {
          console.log('error aqui')
        }
      } finally {
        setLoading(false)
      }
    }
    getRequestPlace()
  }, [])

  const handlePlaceMenu = (event) => {
    if (anchorElPlace) {
      setAnchorElPlace(null)
    } else {
      setAnchorElPlace(event.currentTarget)
    }
  }

  const onDeletePlace = async () => {
    setAnchorElPlace(null)
    try {
      await deletePlace(id, credential)

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Helmet>
        <title>Place | AlignMind</title>
      </Helmet>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        {loading && <Skeleton variant="h6" width={250} />}
        {!loading && <Typography
          variant="h6"
          noWrap
          component="div"
        >
          {namePlace}
        </Typography>}
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
          <MenuItem
            key="1"
            onClick={() => navigate(`/place/${id}/edit`)}>
            <FormattedMessage id="options.edit.place" defaultMessage="Edit place" />
          </MenuItem>
          <MenuItem
            key="2"
            onClick={onDeletePlace}>
            <FormattedMessage id="options.delete.place" defaultMessage="Delete place" />
          </MenuItem>
        </Menu>
      </Toolbar>
      <ShowThinks id={id} />
    </Box >
  )
}

export { ShowPlacePage }
