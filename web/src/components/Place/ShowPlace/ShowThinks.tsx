import MoreVertIcon from '@mui/icons-material/MoreVert'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
} from '@mui/material'

import { useEffect, useState, type MouseEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { BadRequestError, NotFoundError } from '@/errors/typeErrors'
import { getThinksPlace } from 'services/place'
import { deleteThink, type ResponseThinks } from 'services/think'
import { EmptyThink } from './EmptyThink'

export interface ShowThinksProps {
  id: string
}

export interface OptionThink {
  text: string | JSX.Element
  click: (idThink: string) => void
}

export function ShowThinks({ id }: ShowThinksProps): JSX.Element {
  const navigate = useNavigate()

  const [allThink, setAllThink] = useState<ResponseThinks>([])
  const [options, setOptions] = useState<OptionThink[]>([])
  const [idSelect, setIdSelect] = useState<string>('')

  const [loading, setLoading] = useState(true)

  const [anchorElThink, setAnchorElThink] = useState<HTMLButtonElement | null>(null)
  const [anchorElOrder, setAnchorElOrder] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    void getThinks()
  }, [])

  const getThinks = async (): Promise<void> => {
    try {
      setLoading(true)

      const response = await getThinksPlace(id)

      setAllThink(response)

      setOptions([
        {
          text: <FormattedMessage id='options.think.see' defaultMessage='See thought' />,
          click: (idThink: string) => {
            navigate(`/think/${idThink}`)
          },
        },
        {
          text: <FormattedMessage id='options.think.delete' defaultMessage='Delete thought' />,
          click: async (idThink: string) => {
            await onDelete(idThink)
          },
        },
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

  const onDelete = async (idThink: string): Promise<void> => {
    setAnchorElThink(null)
    try {
      await deleteThink(idThink)

      await getThinks()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Box sx={{ p: '30px' }}>
        <Toolbar
          sx={{
            background: '#ffffff',
            borderBottom: '1px solid rgba(0, 0 ,0, 0.12)',
            gap: 1,
            borderRadius: '10px 10px 0 0',
          }}
        >
          <Button variant='text' startIcon={<SwapVertIcon />} onClick={handleOrderMenu}>
            <FormattedMessage id='options.order.text' defaultMessage='Order' />
          </Button>
        </Toolbar>
        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, pb: '10px', height: '100%' }}>
          {loading && <Skeleton variant='rectangular' height={25} />}
          {!loading && allThink.length === 0 && <EmptyThink />}
          {!loading &&
            allThink.length > 0 &&
            allThink.map((value) => {
              return (
                <ListItem
                  sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                  key={value.id}
                  secondaryAction={
                    <IconButton
                      edge='end'
                      aria-label='comments'
                      onClick={(e) => {
                        handleThinkMenu(e, value.id)
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    dense
                    onClick={() => {
                      navigate(`/think/${value.id}`)
                    }}
                  >
                    <ListItemText primary={`${value?.text}`} />
                  </ListItemButton>
                </ListItem>
              )
            })}
        </List>
        <Menu
          sx={{ mt: '40px', zIndex: 1202 }}
          id='menu-appbar'
          anchorEl={anchorElThink}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElThink)}
          onClose={handleThinkMenu}
        >
          {options.map((value, index) => (
            <MenuItem
              // rome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={index}
              onClick={() => {
                value.click(idSelect)
              }}
            >
              {value.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Menu
        sx={{ mt: '40px', zIndex: 1202 }}
        id='menu-appbar'
        anchorEl={anchorElOrder}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElOrder)}
        onClose={handleOrderMenu}
      >
        <MenuItem key='1'>
          <FormattedMessage id='options.order.think.recent' defaultMessage='Recent' />
        </MenuItem>
        <MenuItem key='2'>
          <FormattedMessage id='options.order.think.older' defaultMessage='Older' />
        </MenuItem>
        <MenuItem key='3'>
          <FormattedMessage id='options.order.think.alphabetical' defaultMessage='Alphabetical order' />
        </MenuItem>
      </Menu>
    </>
  )
}
