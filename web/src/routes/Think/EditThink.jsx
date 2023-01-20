import { Autocomplete, Box, Button, List, ListItem, ListItemButton, ListItemText, TextareaAutosize, TextField, Toolbar } from '@mui/material'
import { Delete as DeleteIcon, Archive as ArchiveIcon } from '@mui/icons-material'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'

function EditThinkPage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const { credentials } = useAuth()
  const [think, setThink] = useState({})
  const [place, setPlace] = useState({})
  const [newTextThink, setNewTextThink] = useState('')
  const [emotions, setEmotions] = useState([])
  const [allEmotions, setAllEmotions] = useState([])
  const [newEmotionsThink, setNewEmotionsThink] = useState([])

  useEffect(() => {
    async function getThink () {
      try {
        const response = await axios.get(`/thinks/${id}`, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })
        setThink(response.data.data)
      } catch (err) {
        if (!err?.response) {
          console.log('Server not response')
        } else if (err.response?.status === 404) {
          navigate('/dashboard')
        } else {
          console.log('error aqui')
        }
      }
    }
    getThink()
  }, [])

  useEffect(() => {
    async function getEmotions () {
      const response = await axios.get('/emotions/', {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })
      setAllEmotions(response?.data.data.map(data => {
        return { text: data.name_emotion, id: data.emotion_id }
      }))
    }
    getEmotions()
  }, [])

  useEffect(() => {
    async function getEmotions () {
      try {
        const response = await axios.get(`/thinks/${id}/emotions`, {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })
        setEmotions(response?.data.data.map(data => {
          return { text: data.name_emotion, id: data.emotion_id }
        }))
      } catch (err) {
        if (!err?.response) {
          console.log('Server not response')
        } else if (err.response?.status === 404) {
          navigate('/dashboard')
        } else {
          console.log('error aqui')
        }
      }
    }
    getEmotions()
  }, [])

  useEffect(() => {
    if (Object.entries(think).length >= 1) {
      async function getPlace () {
        try {
          const response = await axios.get(`/places/${think.place_id}`, {
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
    }
  }, [think])

  useEffect(() => {
    if (Object.entries(think).length >= 1) {
      setNewTextThink(think.text_think)
    }
  }, [think])

  useEffect(() => {
    if (emotions.length >= 1) {
      setNewEmotionsThink(emotions)
    }
  }, [emotions])

  const onDelete = async () => {
    try {
      await axios.post(`/thinks/${id}/trash`, {}, {
        headers: {
          Authorization: `Bearer ${credentials}`
        }
      })

      navigate(`/place/${think.place_id}`, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  const onArchive = async () => {
    try {
      await axios.put(`/thinks/${id}/`,
        JSON.stringify({
          is_archive: true
        }), {
          headers: {
            Authorization: `Bearer ${credentials}`
          }
        })

      navigate(`/place/${think.place_id}`, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  const onSave = async () => {
    if (JSON.stringify(emotions) !== JSON.stringify(newEmotionsThink)) {
      for await (const value of newEmotionsThink) {
        if (!emotions.some(obj => obj.id === value.id)) {
          try {
            await axios.post(`/thinks/${id}/emotions`,
              JSON.stringify({
                emotion_id: value.id
              }), {
                headers: {
                  Authorization: `Bearer ${credentials}`
                }
              })
          } catch (err) {
            console.log(err)
          }
        }
      }
      for await (const value of emotions) {
        if (!newEmotionsThink.some(obj => obj.id === value.id)) {
          try {
            await axios.delete(`/thinks/${id}/${value.id}`,
              {
                headers: {
                  Authorization: `Bearer ${credentials}`
                }
              })
          } catch (err) {
            console.log(err)
          }
        }
      }
    }

    if (think.text_think !== newTextThink.trimEnd()) {
      try {
        await axios.put(`/thinks/${id}/`,
          JSON.stringify({
            text_think: newTextThink.trimEnd()
          }), {
            headers: {
              Authorization: `Bearer ${credentials}`
            }
          })
      } catch (err) {
        console.log(err)
      }
    }
    navigate(`/place/${think.place_id}`)
  }

  return (
    <Box sx={{
      p:
        '30px',
      height: { xs: '100%', md: '480px' },
      width: '100%',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      <Box sx={{
        width: { xs: '100%', md: '60%' },
        height: { xs: '300px', md: '100%' },
        background: '#ffffff'
      }}>
        <TextareaAutosize
          style={{ resize: 'none', height: '100%', fontSize: '16px', width: '100%', padding: '10px' }}
          value={newTextThink}
          onChange={(e) => setNewTextThink(e.target.value)}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: { xs: '100%', md: '40%' },
          background: '#ffffff',
          height: '100%',
          px: '10px',
          pb: '10px'
        }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Toolbar sx={{
            background: '#ffffff',
            borderBottom: '1px solid rgba(0, 0 ,0, 0.12)',
            gap: 1,
            justifyContent: 'end'
          }}>
            <Button
              variant="text"
              startIcon={<DeleteIcon />}
              onClick={onDelete}>
              <FormattedMessage id="button.delete" defaultMessage="Delete" />
            </Button>
            <Button
              variant="text"
              startIcon={<ArchiveIcon />}
              onClick={onArchive}>
              <FormattedMessage id="button.archive" defaultMessage="Archive" />
            </Button>
          </Toolbar>

          <Box sx={{ pt: '10px' }}>
            <Autocomplete multiple
              id="tags-standard"
              value={newEmotionsThink}
              onChange={(event, newValue) => {
                setNewEmotionsThink([
                  ...newValue
                ])
              }}
              options={allEmotions}
              getOptionLabel={(option) => option.text}
              renderInput={(params) => (
                <TextField {...params}
                  variant="standard"
                  placeholder="Emociones"
                />
              )} />

            <List sx={{ width: '100%' }}>
              <ListItem
                sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                key={1}
              >
                <ListItemButton role={undefined} dense>
                  <ListItemText
                    primary={<FormattedMessage id="think.info.place" defaultMessage="Place: {name}" values={{ name: place?.name || '' }} />}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                key={2}
              >
                <ListItemButton role={undefined} dense>
                  <ListItemText
                    primary={<FormattedMessage id="think.info.date" defaultMessage="Created at: {create}" values={{ create: dayjs(think?.created_at).format('YYYY-MM-DD') }} />}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate(-1)}>
            <FormattedMessage id="button.back" defaultMessage="Back" />
          </Button>
          <Button
            variant="contained"
            onClick={onSave}
            disabled={!!(newTextThink === think?.text_think || newTextThink.trimEnd().length < 5) && !!(JSON.stringify(emotions) === JSON.stringify(newEmotionsThink))}>
            <FormattedMessage id="button.save" defaultMessage="Save" />
          </Button>
        </Box>
      </Box>
    </Box >
  )
}

export { EditThinkPage }
