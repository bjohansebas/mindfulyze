import { Avatar, Box, Button, Menu, TextField, Toolbar } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SketchPicker } from 'react-color'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet-async'

import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'

function EditPlacePage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const { credential } = useAuth()

  const [place, setPlace] = useState({})
  const [newTextPlace, setNewTextPlace] = useState('')
  const [loading, setLoading] = useState(true)

  const [allColors, setAllColors] = useState([])
  const [newColor, setNewColor] = useState('#00575C')
  const [anchorElColor, setAnchorElColor] = useState(null)

  useEffect(() => {
    async function getPlace () {
      try {
        const response = await axios.get(`/places/${id}`, {
          headers: {
            Authorization: `Bearer ${credential}`
          }
        })
        const data = response?.data

        setPlace({ name: data.name, color: data.color.code })

        setLoading(false)
      } catch (err) {
        if (!err?.response) {
          console.log(err)
        } else if (err.response?.status === 404) {
          navigate('/')
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
        const response = await axios.get('/users/colors', {
          headers: {
            Authorization: `Bearer ${credential}`
          }
        })
        setAllColors(response?.data.map((data) => {
          return { color: '#' + data.code, title: data.name, id: data.id }
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
      request = { code: newColor.slice(1) }
    }

    if (newTextPlace.trimEnd() !== place.name) {
      request = { name: newTextPlace.trimEnd(), ...request }
    }

    if (Object.entries(request).length >= 1) {
      try {
        await axios.put(`/places/${id}/`,
          JSON.stringify(request), {
            headers: {
              Authorization: `Bearer ${credential}`
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
      <Helmet>
        <title>Edit place | AlignMind</title>
      </Helmet>
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
              disabled={loading}
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
          <Button variant="text" startIcon={<DeleteIcon />} disabled={loading}>
            <FormattedMessage id="button.delete" defaultMessage="Delete" />
          </Button>
        </Toolbar>

        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(`/place/${id}`)}
          >
            <FormattedMessage id="button.back" defaultMessage="Back" />
          </Button>

          <Button
            variant="contained"
            onClick={onSave}
            disabled={
              loading || (newColor.slice(1) === place.color && newTextPlace === place.name) || newTextPlace.length < 2}
          >
            <FormattedMessage id="button.save" defaultMessage="Save" />
          </Button>
        </Box>
      </Box>
    </Box >
  )
}

export { EditPlacePage }
