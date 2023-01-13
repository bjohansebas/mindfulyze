import { Autocomplete, Box, Button, ButtonGroup, TextField, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Forms } from '../../components/Form'
import { useEffect, useState } from 'react'
import { Combobox } from '../../components/Combobox'
import { useAuth } from '../../hooks/useAuth'
import axios from '../../api/axios'

function NewThinkPage () {
  const navigate = useNavigate()

  const { userId, credentials } = useAuth()
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
          Authorization: `Bearer ${credentials}`
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
          Authorization: `Bearer ${credentials}`
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
    console.log('dd')
    if (textThink.trimEnd().length < 5) {
      setErrMsg('Invalid Entry')
      setLoading(false)
      return
    }

    try {
      console.log('dd2')
      console.log(place)
      const response = await axios.post(`/thinks/${userId}`,
        JSON.stringify({
          text_think: textThink.trimEnd(),
          place_id: place.id
        }),
        {
          headers: { Authorization: `Bearer ${credentials}` }
        })

      const thinkId = response?.data.data.think_id

      console.log('dd3')

      emotionsSelect.forEach(async (emotion) => {
        try {
          await axios.post(`/thinks/${thinkId}/emotions`,
            JSON.stringify({
              emotion_id: emotion.id
            }),
            {
              headers: { Authorization: `Bearer ${credentials}` }
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
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          py: '20px',
          width: '100%',
          mx: { sm: '10px', md: 0 }
        }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: ' center',
          flexDirection: 'column',
          width: '70%',
          gap: 3,
          p: '30px',
          borderRadius: '10px'
        }}>
          <Forms title="Crea un nuevo pensamiento" isCancel={true} disableSubmit={loading} submitText="Crear lugar" handleSubmit={handleSubmit}>
            <TextField
              type="text"
              variant='outlined'
              value={textThink}
              onChange={(e) => setTextThink(e.target.value)}
              required
            />
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                      m: 1
                    }
                  }}
                >
                  <ButtonGroup variant="text" aria-label="outlined button group">
                    <Button variant='contained'>Lugar</Button>
                    <Button component={Link} to="/think/new">Think</Button>
                  </ButtonGroup>
                </Box>
                <Combobox options={allPlaces} setOptionSelect={setPlace} />
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
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      label="Emociones"
                      placeholder="Emociones"
                    />
                  )} />
              </Box>
              <Box>
                {!errMsg && <Typography>{errMsg}</Typography>}
              </Box>
            </Box>
          </Forms>
        </Box>
      </Box>
    </>)
}
export { NewThinkPage }
