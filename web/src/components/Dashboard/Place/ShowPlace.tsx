import { Box, List, IconButton, Menu, MenuItem, Typography, ListItem, ListItemButton, ListItemText, Skeleton } from '@mui/material'
import { MoreVert } from '@mui/icons-material'

import { useEffect, useState, type MouseEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { useAuth } from 'hooks/useAuth'
import { deletePlace, getAllPlaces, type ResponseAllPlaces } from 'services/place'

import { EmptyPlace } from './EmptyPlace'

export function ShowPlaces (): JSX.Element {
  const { accessToken } = useAuth()
  const navigate = useNavigate()

  const [allPlaces, setAllPlaces] = useState<ResponseAllPlaces>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [idSelect, setIdSelect] = useState('')

  const getPlace = async (): Promise<void> => {
    try {
      if (accessToken != null) {
        const response = await getAllPlaces(accessToken)

        setAllPlaces(response)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handlePlaceMenu = (event: MouseEvent<HTMLButtonElement>, id: string): void => {
    if (anchorEl != null) {
      setIdSelect('')
      setAnchorEl(null)
    } else {
      setIdSelect(id)
      setAnchorEl(event.currentTarget)
    }
  }

  const onDelete = async (): Promise<void> => {
    try {
      setLoading(true)
      setAnchorEl(null)
      if (accessToken != null) {
        await deletePlace(idSelect, accessToken)
        await getPlace()
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void getPlace()
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
            sx={{ borderRadius: '10px', boxShadow: `0 0 10px #${data.color.code}80`, background: '#ffffff' }}
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="comments" onClick={(e) => { handlePlaceMenu(e, data.id) }}>
                <MoreVert />
              </IconButton>
            }
            disablePadding>
            <ListItemButton
              sx={{ py: '20px', borderRadius: '10px' }}
              role={undefined}
              dense
              onClick={() => { navigate(`/place/${data?.id}`) }}>
              <ListItemText primary={`${data.name}`} />
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
          onClick={() => { navigate(`/place/${idSelect}/edit`) }}>
          <FormattedMessage id="options.edit.place" defaultMessage="Edit place" />
        </MenuItem>
      </Menu>
    </Box>
  )
}
