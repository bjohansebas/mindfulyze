import { Avatar, Box, Button, ButtonGroup, Menu, TextField, Typography } from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import { SketchPicker } from 'react-color'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet-async'

import { HEXADECIMAL_REGEX } from '../../utils/regex'
import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'
import { Forms } from '../../components/Form'

function NewPlacePage () {
  const navigate = useNavigate()
  const { userId, credentials } = useAuth()

  const [color, setColor] = useState('#00575C')
  const [textPlace, setTextPlace] = useState('')
  const [textColorName, setTextColorName] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [anchorElColor, setAnchorElColor] = useState(null)
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
    if (allColors.length >= 1) {
      const isExist = allColors.filter(col => {
        return col.color === color
      })

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

  const handleColorMenu = (event) => {
    if (anchorElColor) {
      setAnchorElColor(null)
    } else {
      setAnchorElColor(event.currentTarget)
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
      <Helmet>
        <title>New place | AlignMind</title>
      </Helmet>
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
        <Forms
          title={<FormattedMessage id='place.new.title' defaultMessage="Create a new place" />}
          disableSubmit={loading}
          isCancel={true}
          submitText={<FormattedMessage id='place.new.submit' defaultMessage="Create a place" />}
          handleSubmit={handleSubmit}>
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
                <Button variant='contained'>
                  <FormattedMessage id="select.new.place" defaultMessage="Place" />
                </Button>
                <Button component={Link} to="/think/new">
                  <FormattedMessage id="select.new.think" defaultMessage="Think" />
                </Button>
              </ButtonGroup>
            </Box>
            <Box sx={{ position: 'relative' }}>
              <Button
                variant='text'
                onClick={handleColorMenu}
                startIcon={
                  <Avatar sx={{
                    background: `${color}`,
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
                <SketchPicker color={color} onChange={(col) => {
                  setColor(col.hex)
                }} presetColors={allColors} />
              </Menu>
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
