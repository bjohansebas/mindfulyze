import { Avatar, Box, Button, Menu, TextField, Toolbar } from '@mui/material'
import { Delete as DeleteIcon } from '@mui/icons-material'

import { type MouseEvent, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { SketchPicker } from 'react-color'
import { type PresetColor } from 'react-color/lib/components/sketch/Sketch'
import { isAxiosError } from 'axios'

import { FormattedMessage } from 'react-intl'

import { useAuth } from 'hooks/useAuth'

import { type ResponsePlace, getPlace, putPlace } from 'services/place'
import { getAllColor } from 'services/color'

export function EditPlaceUI (): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const { credential } = useAuth()

  const [place, setPlace] = useState<ResponsePlace | null>(null)
  const [newTextPlace, setNewTextPlace] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const [allColors, setAllColors] = useState<PresetColor[]>([])
  const [newColor, setNewColor] = useState<string>('#00575C')
  const [anchorElColor, setAnchorElColor] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    async function getOnePlace (): Promise<void> {
      try {
        if (id == null || credential == null) return
        const data = await getPlace(id, credential)

        setPlace(data)

        setLoading(false)
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response?.status === 404) {
            navigate('/')
          }
        }
      }
    }
    void getOnePlace()
  }, [])

  useEffect(() => {
    if (place != null) {
      if (Object.entries(place).length >= 1) {
        setNewTextPlace(place.name)
        setNewColor(`#${place.color.code}`)
      }
    }
  }, [place])

  useEffect(() => {
    async function getColor (): Promise<void> {
      try {
        if (credential == null) return
        const response = await getAllColor(credential)
        const colors: PresetColor[] = response.map((value) => {
          return { color: '#' + value.code, title: value.code }
        }) as PresetColor[]

        setAllColors(colors)
      } catch (e) {
        console.log(e)
      }
    }

    void getColor()
  }, [])

  const handleColorMenu = (event: MouseEvent<HTMLButtonElement>): void => {
    if (anchorElColor != null) {
      setAnchorElColor(null)
    } else {
      setAnchorElColor(event.currentTarget)
    }
  }

  const onSave = async (): Promise<void> => {
    let request = {}
    if (place == null || id == null || credential == null) return

    if (newColor.slice(1) !== place.color.code) {
      request = { code: newColor.slice(1) }
    }

    if (newTextPlace.trimEnd() !== place.name) {
      request = { name: newTextPlace.trimEnd(), ...request }
    }

    if (Object.entries(request).length >= 1) {
      try {
        await putPlace(id, request, credential)
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
          onChange={(e) => { setNewTextPlace(e.target.value) }}
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
            onClick={() => { if (id != null) { navigate(`/place/${id}`) } }}
          >
            <FormattedMessage id="button.back" defaultMessage="Back" />
          </Button>

          <Button
            variant="contained"
            onClick={onSave}
            disabled={
              loading || place == null || (newColor.slice(1) === place.color.code && newTextPlace === place.name) || newTextPlace.length < 2}
          >
            <FormattedMessage id="button.save" defaultMessage="Save" />
          </Button>
        </Box>
      </Box>
    </Box >
  )
}
