import { Avatar, Box, Button, Menu, TextField, Toolbar } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SketchPicker } from 'react-color'
import { FormattedMessage } from 'react-intl'

import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'

function EditPlacePage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const [anchorElColor, setAnchorElColor] = useState(null)
  const { userId, credentials } = useAuth()
  const [place, setPlace] = useState({})
  const [newTextPlace, setNewTextPlace] = useState('')
  const [allColors, setAllColors] = useState([])
  const [newColor, setNewColor] = useState('#00575C')

  useEffect(() => {
    async function getPlace () {
      try {
        const response = await axios.get(`/places/${id}`, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })
        const data = response?.data.data
        const responseColor = await axios.get(`/colors/${data.color_id}`, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })

        setPlace({ name: data.name_place, color: responseColor.data.data.code_color })
      } catch (err) {
        if (!err?.response) {
          console.log(err)
        } else if (err.response?.status === 404) {
          navigate('/dashboard')
        } else {
          console.log('error aqui')
        }
      }
    }
    getPlace()
  }, [])

  useEffect(() => {
    if (Object.entries(place).length >= 1) {
      setNewTextPlace(place.name)
    }
  }, [place])

  useEffect(() => {
    async function getColor () {
      try {
        const response = await axios.get(`/users/${userId}/colors`, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })
        setAllColors(response?.data.data.map((data) => {
          return { color: '#' + data.code_color, title: data.name_color, id: data.color_id }
        }))
      } catch (e) {
        console.log(e)
      }
    }
    getColor()
  }, [])

  useEffect(() => {
    if (Object.entries(place).length >= 1) {
      setNewColor(`#${place.color}`)
    }
  }, [place])

  const handleColorMenu = (event) => {
    if (anchorElColor) {
      setAnchorElColor(null)
    } else {
      setAnchorElColor(event.currentTarget)
    }
  }

  const onSave = async () => {
    let request = {}
    if (newColor.slice(1) !== place.color) {
      request = { code_color: newColor.slice(1) }
    }

    if (newTextPlace.trimEnd() !== place.name) {
      request = { name_place: newTextPlace.trimEnd(), ...request }
    }

    if (Object.entries(request).length >= 1) {
      try {
        await axios.put(`/places/${id}/`,
          JSON.stringify(request), {
            headers: {
              Authorization: `Bearer ${credentials}`
            }
          })
        navigate(`/place/${id}`)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <Box sx={{ p: '30px', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', margin: { xs: '50px 0', sm: '50px' }, background: '#ffffff' }}>
      <Box sx={{ width: '100%' }}>
        <TextField
          sx={{ width: '100%' }}
          value={newTextPlace}
          onChange={(e) => setNewTextPlace(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          background: '#ffffff',
          height: '100%',
          px: '10px',
          pb: '10px',
          gap: 3
        }}>
        <Toolbar sx={{
          background: '#ffffff',
          borderBottom: '1px solid rgba(0, 0 ,0, 0.12)',
          gap: 1,
          justifyContent: 'space-between'
        }}>
          <Box>
            <Button
              variant='text'
              onClick={handleColorMenu}
              startIcon={
                <Avatar sx={{
                  background: `${newColor}`,
                  width: '22px',
                  height: '22px',
                  p: '0'
                }}>
                  <></>
                </Avatar>
              }>
              <FormattedMessage id="button.color" defaultMessage="Color" />
            </Button>
            <Menu
              style={{ padding: '0' }}
              sx={{ mt: '36px', zIndex: 1202 }}
              anchorEl={anchorElColor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElColor)}
              onClose={handleColorMenu} >
              <SketchPicker color={newColor} onChange={(col) => {
                setNewColor(col.hex)
              }} presetColors={allColors} />
            </Menu>
          </Box>
          <Button variant="text" startIcon={<DeleteIcon />}>
            <FormattedMessage id="button.delete" defaultMessage="Delete" />
          </Button>
        </Toolbar>

        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large" onClick={() => navigate(`/place/${id}`)}>
            <FormattedMessage id="button.back" defaultMessage="Back" />
          </Button>
          <Button
            variant="contained"
            onClick={onSave}
            disabled={!!(newColor.slice(1) === place.color) && !!(newTextPlace === place.name || newTextPlace.length < 5)}>
            <FormattedMessage id="button.save" defaultMessage="Save" />
          </Button>
        </Box>
      </Box>
    </Box >
  )
}

export { EditPlacePage }
