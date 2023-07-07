import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Skeleton, Toolbar } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { type MouseEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { getArchiveThinksPlace, getThinksPlace, getTrashPlace } from 'services/place'
import { type ResponseThinks, moveToTrash, putThink } from 'services/think'
import { type ResponseTrashes, deleteThinkFromTrash, restoreFromTrash } from 'services/trash'
import { EmptyThink } from './EmptyThink'
import { BadRequestError, NotFoundError } from '@/errors/typeErrors'

export interface ShowThinksProps {
  id: string
}

export interface OptionThink {
  text: string | JSX.Element
  click: (idThink: string) => void
}

export function ShowThinks ({ id }: ShowThinksProps): JSX.Element {
  const navigate = useNavigate()

  const [allThink, setAllThink] = useState<ResponseThinks | ResponseTrashes>([])
  const [options, setOptions] = useState<OptionThink[]>([])
  const [idSelect, setIdSelect] = useState<string>('')

  const [loading, setLoading] = useState(true)

  const [anchorElThink, setAnchorElThink] = useState<HTMLButtonElement | null>(null)
  const [anchorElFilter, setAnchorElFilter] = useState<HTMLButtonElement | null>(null)
  const [anchorElOrder, setAnchorElOrder] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    void getThinks()
  }, [])

  const getThinks = async (): Promise<void> => {
    try {
      setAnchorElFilter(null)
      setLoading(true)

      const response = await getThinksPlace(id)

      setAllThink(response)

      setOptions([
        {
          text: <FormattedMessage id="options.think.see" defaultMessage="See thought" />,
          click: (idThink: string) => { navigate(`/think/${idThink}`) }
        },
        {
          text: <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />,
          click: async (idThink: string) => { await onDelete(idThink) }
        },
        {
          text: <FormattedMessage id="options.think.archive" defaultMessage="Archive" />,
          click: async (idThink: string) => { await onArchive(idThink) }
        }
      ])

      setLoading(false)
    } catch (err) {
      if (err instanceof NotFoundError || err instanceof BadRequestError) {
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  const getTrashThinks = async (): Promise<void> => {
    try {
      setAnchorElFilter(null)
      setLoading(true)
      const response = await getTrashPlace(id)

      setAllThink(response)

      setOptions([
        {
          text: <FormattedMessage id="options.think.see" defaultMessage="See thought" />,
          click: (idThink) => { navigate(`/trash/${idThink}`) }
        },
        {
          text: <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />,
          click: async (idThink) => { await onDeleteTrash(idThink) }
        },
        {
          text: <FormattedMessage id="options.think.restore" defaultMessage="Restore thought" />,
          click: async (idThink) => { await onRestoreId(idThink) }
        }
      ])

      setLoading(false)
    } catch (err) {
      if (err instanceof NotFoundError || err instanceof BadRequestError) {
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  const getArchiveThinks = async (): Promise<void> => {
    try {
      setAnchorElFilter(null)
      setLoading(true)

      const response = await getArchiveThinksPlace(id)

      setAllThink(response)

      setOptions([
        {
          text: <FormattedMessage id="options.think.see" defaultMessage="See thought" />,
          click: (idThink) => {
            navigate(`/think/${idThink}`)
          }
        },
        {
          text: <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />,
          click: async (idThink) => { await onDelete(idThink) }
        },
        {
          text: <FormattedMessage id="options.think.unarchive" defaultMessage="Unarchive" />,
          click: async (idThink) => { await onUnarchiveId(idThink) }
        }
      ])
    } catch (err) {
      if (err instanceof NotFoundError || err instanceof BadRequestError) {
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFilterMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    if (anchorElFilter != null) {
      setAnchorElFilter(null)
    } else {
      setAnchorElFilter(event.currentTarget)
    }
  }

  const handleOrderMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    if (anchorElOrder != null) {
      setAnchorElOrder(null)
    } else {
      setAnchorElOrder(event.currentTarget)
    }
  }

  const handleThinkMenu = (event: MouseEvent<HTMLButtonElement>, id: string): void => {
    if (anchorElThink != null) {
      setIdSelect('')
      setAnchorElThink(null)
    } else {
      setIdSelect(id)
      setAnchorElThink(event.currentTarget)
    }
  }

  const onRestoreId = async (idThink: string): Promise<void> => {
    try {
      setAnchorElThink(null)
      await restoreFromTrash(idThink)

      await getTrashThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onDeleteTrash = async (idThink: string): Promise<void> => {
    try {
      setAnchorElThink(null)
      await deleteThinkFromTrash(idThink)

      await getTrashThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onUnarchiveId = async (idThink: string): Promise<void> => {
    try {
      setAnchorElThink(null)
      await putThink(idThink, { isArchive: false })

      await getArchiveThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onArchive = async (idThink: string): Promise<void> => {
    setAnchorElThink(null)
    try {
      await putThink(idThink, { isArchive: true })

      await getThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onDelete = async (idThink: string): Promise<void> => {
    setAnchorElThink(null)
    try {
      await moveToTrash(idThink)

      await getThinks()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box sx={{ p: '30px' }}>
        <Toolbar sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0, 0 ,0, 0.12)', gap: 1, borderRadius: '10px 10px 0 0' }}>
          <Button
            variant="text"
            startIcon={<FilterListIcon />}
            onClick={handleFilterMenu}
          >
            <FormattedMessage id="options.filter.text" defaultMessage="Filter" />
          </Button>
          <Button
            variant="text"
            startIcon={<SwapVertIcon />}
            onClick={handleOrderMenu}
          >
            <FormattedMessage id="options.order.text" defaultMessage="Order" />
          </Button>
        </Toolbar>
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, pb: '10px', height: '100%' }}>
          {loading && <Skeleton variant="rectangular" height={25} />}
          {(!loading && allThink.length === 0) && <EmptyThink />}
          {(!loading && allThink.length > 0) && allThink.map((value, index) => {
            return (
              <ListItem
                sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="comments" onClick={(e) => { handleThinkMenu(e, value.id) }}>
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
        </List>
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
          {
            options.map((value, index) => (
              <MenuItem key={index} onClick={() => { value.click(idSelect) }} >
                {value.text}
              </MenuItem>
            ))
          }
        </Menu>
      </Box>
      <Menu
        sx={{ mt: '40px', zIndex: 1202 }}
        id="menu-appbar"
        anchorEl={anchorElFilter}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElFilter)}
        onClose={handleFilterMenu}
      >
        <MenuItem
          key="1"
          onClick={getThinks}>
          <FormattedMessage id="options.filter.think.place" defaultMessage="Only place" />
        </MenuItem>
        <MenuItem
          key="2"
          onClick={getArchiveThinks}>
          <FormattedMessage id="options.filter.think.archive" defaultMessage="Only archive" />
        </MenuItem>
        <MenuItem
          key="3"
          onClick={getTrashThinks}>
          <FormattedMessage id="options.filter.think.trash" defaultMessage="Only trash" />
        </MenuItem>
      </Menu>
      <Menu
        sx={{ mt: '40px', zIndex: 1202 }}
        id="menu-appbar"
        anchorEl={anchorElOrder}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={Boolean(anchorElOrder)}
        onClose={handleOrderMenu}
      >
        <MenuItem
          key="1">
          <FormattedMessage id="options.order.think.recent" defaultMessage="Recent" />
        </MenuItem>
        <MenuItem
          key="2">
          <FormattedMessage id="options.order.think.older" defaultMessage="Older" />
        </MenuItem>
        <MenuItem
          key="3">
          <FormattedMessage id="options.order.think.alphabetical" defaultMessage="Alphabetical order" />
        </MenuItem>
      </Menu>
    </>
  )
}
