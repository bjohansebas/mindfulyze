import { Autocomplete, Box, Button, ButtonGroup, TextareaAutosize, TextField, Typography } from '@mui/material'

import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet-async'

import { Forms } from '../../components/Form'
import { Combobox } from '../../components/Combobox'
import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'

function NewThinkPage () {
  const navigate = useNavigate()

  const { userId, credential } = useAuth()
  const [textThink, setTextThink] = useState('')
  const [allPlaces, setAllPlaces] = useState([])
  const [place, setPlace] = useState({})
  const [loading, setLoading] = useState(true)

  const [errMsg, setErrMsg] = useState('')
  const [allEmotions, setAllEmotions] = useState([])
  const [emotionsSelect, setEmotionsSelect] = useState([])

  useEffect(() => {
    async function getPlace () {
      setLoading(true)
      const response = await axios.get(`/users/${userId}/places`, {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })
      setAllPlaces(response?.data.data.map(data => {
        return { text: data.name_place, id: data.place_id }
      }))
      setLoading(false)
    }
    getPlace()
  }, [])

  useEffect(() => {
    async function getEmotions () {
      setLoading(true)
      const response = await axios.get('/emotions/', {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })
      setAllEmotions(response?.data.data.map(data => {
        return { text: data.name_emotion, id: data.emotion_id }
      }))
      setLoading(false)
    }
    getEmotions()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (textThink.trimEnd().length < 5) {
      setErrMsg('Invalid Entry')
      setLoading(false)
      return
    }

    try {
      const response = await axios.post(`/thinks/${userId}`,
        JSON.stringify({
          text_think: textThink.trimEnd(),
          place_id: place.id
        }),
        {
          headers: { Authorization: `Bearer ${credential}` }
        })

      const thinkId = response?.data.data.think_id

      emotionsSelect.forEach(async (emotion) => {
        try {
          await axios.post(`/thinks/${thinkId}/emotions`,
            JSON.stringify({
              emotion_id: emotion.id
            }),
            {
              headers: { Authorization: `Bearer ${credential}` }
            })
        } catch (e) {
          console.log('error')
        }
      })

      navigate('/place/' + place.id)
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
        setLoading(false)
      } if (err?.response?.data.message === 'Name color is required for created new color') {
        setErrMsg(err?.response.data.message)
      } else {
        setErrMsg('Create had been failed')
        setLoading(false)
      }
    }
  }
  return (
    <>
      <Helmet>
        <title>New think | AlignMind</title>
      </Helmet>
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
          width: { sm: '100%', md: '70%' },
          gap: 3,
          p: '30px',
          borderRadius: '10px',
          background: '#ffffff'
        }}>
          <Forms
            title={<FormattedMessage id="think.new.title" defaultMessage="Create new a think" />}
            isCancel={true}
            disableSubmit={loading || textThink.length < 5 || emotionsSelect.length < 1 || allPlaces.length === 0}
            submitText={<FormattedMessage id="think.new.submit" defaultMessage="Create a think" />}
            handleSubmit={handleSubmit}>
            <TextareaAutosize
              style={{ resize: 'none', minHeight: '56px', maxHeight: '200px', fontSize: '16px' }}
              value={textThink}
              onChange={(e) => setTextThink(e.target.value)}
              required
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: {
                  xs: 'start',
                  sm: 'center'
                },
                flexDirection: { xs: 'column', lg: 'row' },
                gap: 2
              }}>
              <Box sx={{
                display: 'flex',
                gap: {
                  xs: 1, sm: 3
                },
                alignItems: 'start',
                flexDirection: { xs: 'column', sm: 'row' }
              }
              } >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <ButtonGroup variant="text" aria-label="outlined button group">
                    <Button variant='contained'>
                      <FormattedMessage id="select.new.think" defaultMessage="Think" />
                    </Button>
                    <Button component={Link} to="/place/new">
                      <FormattedMessage id="select.new.place" defaultMessage="Place" />
                    </Button>
                  </ButtonGroup>
                </Box>
                {(!loading && allPlaces.length === 0) &&
                  <Button component={Link} to="/place/new">
                    <FormattedMessage id="place.empty.button" defaultMessage="You must create your first place" />
                  </Button>}
                {allPlaces.length > 0 &&
                  <Combobox options={allPlaces} setOptionSelect={setPlace} />}
              </Box>
              <Box sx={{ width: '300px' }}>
                <Autocomplete
                  multiple
                  id="tags-standard"
                  value={emotionsSelect}
                  onChange={(event, newValue) => {
                    setEmotionsSelect([
                      ...newValue
                    ])
                  }}
                  options={allEmotions}
                  getOptionLabel={(option) => option.text}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label={<FormattedMessage id="think.new.emotion" defaultMessage="Emotions" />}
                    />
                  )} />
              </Box>
            </Box>
            <Box>
              {!errMsg && <Typography>{errMsg}</Typography>}
            </Box>
          </Forms>
        </Box>
      </Box >
    </>)
}
export { NewThinkPage }
