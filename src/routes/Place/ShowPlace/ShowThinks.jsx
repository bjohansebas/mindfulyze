import { Box, Button, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, Skeleton, Toolbar } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import MoreVertIcon from '@mui/icons-material/MoreVert'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { useAuth } from '../../../hooks/useAuth'
import axios from '../../../api/axios'

ShowThinks.propTypes = {
  id: PropTypes.string.isRequired
}

function ShowThinks ({ id }) {
  const navigate = useNavigate()
  const { credential } = useAuth()

  const [allThink, setAllThink] = useState([])
  const [loading, setLoading] = useState(true)

  const [anchorElThink, setAnchorElThink] = useState(null)
  const [anchorElFilter, setAnchorElFilter] = useState(null)
  const [anchorElOrder, setAnchorElOrder] = useState(null)
  const [options, setOptions] = useState([])
  const [idSelect, setIdSelect] = useState('')

  useEffect(() => {
    getThinks()
  }, [])

  const getThinks = async () => {
    try {
      setAnchorElFilter(null)
      setLoading(true)

      const response = await axios.get(`/places/${id}/thinks`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      setAllThink(response?.data.data.map(data => {
        return { text: data.text_think, id: data.think_id, created: data.created_at }
      }))

      setOptions([
        {
          text: <FormattedMessage id="options.think.see" defaultMessage="See thought" />,
          click: (idThink) => navigate(`/think/${idThink}`)
        },
        {
          text: <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />,
          click: (idThink) => onDelete(idThink)
        },
        {
          text: <FormattedMessage id="options.think.archive" defaultMessage="Archive" />,
          click: (idThink) => onArchive(idThink)
        }
      ])

      setLoading(false)
    } catch (err) {
      if (!err?.response) {
        return 'No server response'
      } else if (err.response?.status === 404) {
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  const getTrashThinks = async () => {
    try {
      setAnchorElFilter(null)
      setLoading(true)
      const response = await axios.get(`/places/${id}/trash`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      setAllThink(response?.data.data.map(data => {
        return { text: data.text_think, id: data.trash_th_id, created: data.created_at }
      }))

      setOptions([
        {
          text: <FormattedMessage id="options.think.see" defaultMessage="See thought" />,
          click: (idThink) => navigate(`/trash/${idThink}`)
        },
        {
          text: <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />,
          click: (idThink) => onDeleteTrash(idThink)
        },
        {
          text: <FormattedMessage id="options.think.restore" defaultMessage="Restore thought" />,
          click: (idThink) => onRestoreId(idThink)
        }
      ])

      setLoading(false)
    } catch (err) {
      if (!err?.response) {
        return 'No server response'
      } else if (err.response?.status === 404) {
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  const getArchiveThinks = async () => {
    try {
      setAnchorElFilter(null)
      setLoading(true)

      const response = await axios.get(`/places/${id}/thinks/archive`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      setAllThink(response?.data.data.map(data => {
        return { text: data.text_think, id: data.think_id, created: data.created_at }
      }))

      setOptions([
        {
          text: <FormattedMessage id="options.think.see" defaultMessage="See thought" />,
          click: (idThink) => {
            navigate(`/think/${idThink}`)
          }
        },
        {
          text: <FormattedMessage id="options.think.delete" defaultMessage="Delete thought" />,
          click: (idThink) => onDelete(idThink)
        },
        {
          text: <FormattedMessage id="options.think.unarchive" defaultMessage="Unarchive" />,
          click: (idThink) => onUnarchiveId(idThink)
        }
      ])
    } catch (err) {
      if (!err?.response) {
        return 'No server response'
      } else if (err.response?.status === 404) {
        navigate('/')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFilterMenu = (event) => {
    if (anchorElFilter) {
      setAnchorElFilter(null)
    } else {
      setAnchorElFilter(event.currentTarget)
    }
  }

  const handleOrderMenu = (event) => {
    if (anchorElOrder) {
      setAnchorElOrder(null)
    } else {
      setAnchorElOrder(event.currentTarget)
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

  const onRestoreId = async (idThink) => {
    try {
      setAnchorElThink(null)
      await axios.post(`/trash/${idThink}`, {}, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      await getTrashThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onDeleteTrash = async (idThink) => {
    try {
      setAnchorElThink(null)
      await axios.delete(`/trash/${idThink}`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      await getTrashThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onUnarchiveId = async (idThink) => {
    try {
      setAnchorElThink(null)
      await axios.put(`/thinks/${idThink}`, JSON.stringify({
        is_archive: false
      }), {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      await getArchiveThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onArchive = async (idThink) => {
    setAnchorElThink(null)
    try {
      await axios.put(`/thinks/${idThink}/`,
        JSON.stringify({
          is_archive: true
        }), {
          headers: {
            Authorization: `Bearer ${credential}`
          }
        })

      await getThinks()
    } catch (err) {
      console.log(err)
    }
  }

  const onDelete = async (idThink) => {
    setAnchorElThink(null)
    try {
      await axios.post(`/thinks/${idThink}/trash`, {}, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

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
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, pb: '10px' }}>
          {loading && <Skeleton variant="rectangular" height={25} />}
          {!loading && allThink.map((value, index) => {
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

export { ShowThinks }
