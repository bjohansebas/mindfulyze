import { Box, Button, List, ListItem, ListItemButton, ListItemText, TextareaAutosize, Toolbar } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Delete as DeleteIcon, Archive as ArchiveIcon } from '@mui/icons-material'
import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'
import dayjs from 'dayjs'

function EditThinkPage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const { credentials } = useAuth()
  const [think, setThink] = useState({})
  const [place, setPlace] = useState({})
  const [newTextThink, setNewTextThink] = useState('')

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

  return (
    <Box sx={{ p: '30px', height: { xs: '100%', md: '480px' }, width: '100%', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      <Box sx={{ width: { xs: '100%', md: '60%' }, height: { xs: '300px', md: '100%' }, background: '#ffffff' }}>
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
          <Toolbar sx={{ background: '#ffffff', borderBottom: '1px solid rgba(0, 0 ,0, 0.12)', gap: 1, justifyContent: 'end' }}>
            <Button variant="text" startIcon={<DeleteIcon />} onClick={onDelete}>Papelera</Button>
            <Button variant="text" startIcon={<ArchiveIcon />} onClick={onArchive}>Archivar</Button>
          </Toolbar>
          <Box>
            <List sx={{ width: '100%' }}>
              <ListItem
                sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                key={1}
              >
                <ListItemButton role={undefined} dense>
                  <ListItemText primary={`Lugar: ${place?.name}`} />
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                key={2}
              >
                <ListItemButton role={undefined} dense gap={2}>
                  <ListItemText primary={`Creado el ${dayjs(think?.created_at).format('YYYY-MM-DD')}`} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" size="large" onClick={() => navigate(`/place/${think.place_id}`)}>Volver</Button>
          <Button variant="contained">Guardar</Button>
        </Box>
      </Box>
    </Box >
  )
}

export { EditThinkPage }
