import { Box, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { SketchPicker } from 'react-color'
import { Forms } from '../../components/Form'
import { useEffect, useState } from 'react'
import { HEXADECIMAL_REGEX } from '../../utils/regex'
import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'

function NewPlacePage () {
  const navigate = useNavigate()
  const { userId, credentials } = useAuth()

  const [color, setColor] = useState('#00575C')
  const [textPlace, setTextPlace] = useState('')
  const [textColorName, setTextColorName] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [displayPicker, setDisplayPicker] = useState(false)

  const [allColors, setAllColors] = useState([])

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
    console.log('hey3')

    if (allColors.length >= 1) {
      console.log('hey')
      const isExist = allColors.filter(col => {
        return col.color === color
      })
      console.log(isExist)

      if (isExist.length >= 1) {
        setTextColorName(isExist[0].title)
        console.log(isExist[0].title)
      }
    }
  }, [color])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const testColor = HEXADECIMAL_REGEX.test(color)

    if (!testColor || textPlace.trimEnd().length < 5) {
      setErrMsg('Invalid Entry')
      setLoading(false)
      return
    }
    let request = {
      name_place: textPlace.trimEnd(),
      code_color: color.slice(1)
    }
    if (textColorName && textColorName.trimEnd().length >= 3) {
      request = { name_color: textColorName.trimEnd(), ...request }
    }

    try {
      const response = await axios.post(`/places/${userId}`,
        JSON.stringify(request),
        {
          headers: { Authorization: `Bearer ${credentials}` }
        })

      navigate('/place/' + response.data.data.place_id)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
        setLoading(false)
      } if (err?.response.data.message === 'Name color is required for created new color') {
        setErrMsg(err?.response.data.message)
      } else {
        setErrMsg('Create had been failed')
        setLoading(false)
      }
    }
  }

  return (<>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'normal',
        flexDirection: 'column',
        alignItems: 'center',
        py: '40px',
        width: '100%',
        mx: { sm: '10px', md: 0 }
      }}
    >
      <Box sx={{
        display: 'flex',
        justifyContent: ' center',
        flexDirection: 'column',
        width: { xs: '100%', sm: '70%' },
        gap: 3,
        p: '40px',
        borderRadius: '10px',
        background: '#ffffff'
      }}>
        <Forms title="Crea un nuevo lugar" disableSubmit={loading} isCancel={true} submitText="Crear lugar" handleSubmit={handleSubmit}>
          <TextField
            type="text"
            variant='outlined'
            value={textPlace}
            onChange={(e) => setTextPlace(e.target.value)}
            required
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: {
                xs: 'start',
                md: 'center'
              },
              flexDirection: { xs: 'column', md: 'row' },
              gap: 2
            }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <ButtonGroup variant="text" aria-label="outlined button group">
                <Button variant='contained'>Lugar</Button>
                <Button component={Link} to="/think/new">Think</Button>
              </ButtonGroup>
            </Box>
            <Box sx={{ display: 'flex', width: '300px', position: 'relative', gap: 2 }}>
              <Box sx={{
                width: '36px',
                height: '36px',
                borderRadius: '2px',
                background: color,
                cursor: 'pointer'
              }} onClick={() => setDisplayPicker(!displayPicker)} />
              <TextField variant='standard' value={textColorName} onChange={(e) => { setTextColorName(e.target.value) }} placeholder="Nombre del color" />
              {
                displayPicker &&
                <div style={{
                  position: 'absolute',
                  marginTop: '36px',
                  top: '0',
                  zIndex: '2'
                }}>
                  <SketchPicker color={color} onChange={(col) => {
                    console.log(col)
                    setColor(col.hex)
                  }} presetColors={allColors} />
                </div>
              }
            </Box>
          </Box>
          <Box>
            {!errMsg && <Typography>{errMsg}</Typography>}
          </Box>
        </Forms>
      </Box>
    </Box>
  </>)
}

export { NewPlacePage }
