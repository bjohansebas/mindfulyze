import { Box, IconButton, Menu, MenuItem, Skeleton, Toolbar, Typography } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { useNavigate, useParams } from 'react-router-dom'
import { type MouseEvent, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet-async'

import { useAuth } from 'hooks/useAuth'
import { deletePlace, getPlace } from 'services/place'
import { ShowThinks } from './ShowThinks'
import { BadRequestError, NotFoundError } from '@/errors/typeErrors'

export function ShowPlaceUI (): JSX.Element {
  const navigate = useNavigate()
  const { credential } = useAuth()
  const { id } = useParams()

  const [anchorElPlace, setAnchorElPlace] = useState<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState(false)

  const [namePlace, setNamePlace] = useState<string>('')

  useEffect(() => {
    async function getRequestPlace (): Promise<void> {
      try {
        if (id == null || credential == null) return
        const responsePlace = await getPlace(id, credential)

        setNamePlace(responsePlace.name)
      } catch (err) {
        if (err instanceof NotFoundError || err instanceof BadRequestError) {
          navigate('/')
        }
      } finally {
        setLoading(false)
      }
    }

    void getRequestPlace()
  }, [])

  const handlePlaceMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    if (anchorElPlace != null) {
      setAnchorElPlace(null)
    } else {
      setAnchorElPlace(event.currentTarget)
    }
  }

  const onDeletePlace = async (): Promise<void> => {
    setAnchorElPlace(null)
    try {
      if (id == null || credential == null) return

      await deletePlace(id, credential)

      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Helmet>
        <title>Place | Mindfulyze</title>
      </Helmet>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff', borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        {loading && <Skeleton width={250} variant='rectangular' />}
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
            onClick={() => { if (id != null) navigate(`/place/${id}/edit`) }}>
            <FormattedMessage id="options.edit.place" defaultMessage="Edit place" />
          </MenuItem>
          <MenuItem
            key="2"
            onClick={onDeletePlace}>
            <FormattedMessage id="options.delete.place" defaultMessage="Delete place" />
          </MenuItem>
        </Menu>
      </Toolbar>
      {
        id != null && <ShowThinks id={id} />
      }
    </Box >
  )
}
