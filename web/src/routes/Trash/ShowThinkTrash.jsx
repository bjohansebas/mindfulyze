import { Autocomplete, Box, Button, List, ListItem, ListItemButton, ListItemText, Skeleton, TextareaAutosize, TextField } from '@mui/material'
import { Delete as DeleteIcon, Restore as RestoreIcon } from '@mui/icons-material'

import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import { Helmet } from 'react-helmet-async'

import { useAuth } from '../../hooks/useAuth'
import { deleteThinkFromTrash, getTrash, restoreFromTrash } from '../../services/trash'

function ShowThinkTrashPage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const { credential } = useAuth()

  const [think, setThink] = useState({})
  const [loadingThink, setLoadingThink] = useState(true)

  const [place, setPlace] = useState({})
  const [loadingPlace, setLoadingPlace] = useState(true)

  const [emotions, setEmotions] = useState([])

  async function getThink () {
    try {
      const data = await getTrash(id, credential)
      setThink(data)
      setEmotions(data.emotions.map(data => {
        return { text: data.emotion.name, id: data.emotion.id }
      }))
      setPlace({ name: data.place.name, id: data.place.id })
    } catch (err) {
      if (!err?.response) {
        console.log('Server not response')
      } else if (err.response?.status === 404) {
        navigate('/')
      } else {
        console.log('error aqui')
      }
    } finally {
      setLoadingThink(false)
      setLoadingPlace(false)
    }
  }

  useEffect(() => {
    getThink()
  }, [])

  const onDelete = async () => {
    try {
      await deleteThinkFromTrash(id, credential)

      navigate(-1, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  const onRestore = async () => {
    try {
      await restoreFromTrash(id, credential)

      navigate(`/place/${place.id}`, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box sx={{
      p: '30px',
      height: { xs: '100%', md: '480px' },
      width: '100%',
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' }
    }}>
      <Helmet>
        <title>Think trash | AlignMind</title>
      </Helmet>
      <Box sx={{
        width: { xs: '100%', md: '60%' },
        height: { xs: '300px', md: '100%' },
        background: '#ffffff'
      }}>
        <TextareaAutosize
          disabled
          value={think.text}
          style={{ resize: 'none', height: '100%', fontSize: '16px', width: '100%', padding: '10px' }}
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

          <Box sx={{ pt: '10px' }}>
            <Autocomplete multiple
              disabled
              id="tags-standard"
              value={emotions}
              options={emotions}
              getOptionLabel={(option) => option.text}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField {...params}
                  variant="standard"
                  label={<FormattedMessage id="think.new.emotion" defaultMessage="Emotions" />}
                />
              )} />

            <List sx={{ width: '100%' }}>
              <ListItem
                sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                key={1}
              >
                <ListItemButton role={undefined} dense>
                  {loadingPlace && <Skeleton variant="text" width={100} />}
                  {!loadingPlace && <ListItemText
                    primary={<FormattedMessage id="think.info.place" defaultMessage="Place: {name}" values={{ name: place?.name || '' }} />}
                  />}
                </ListItemButton>
              </ListItem>
              <ListItem
                sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }}
                key={2}
              >
                <ListItemButton role={undefined} dense>
                  {loadingThink && <Skeleton variant="text" width={200} />}
                  {!loadingThink && <ListItemText
                    primary={<FormattedMessage id="think.info.date" defaultMessage="Created at: {create}" values={{ create: dayjs(think?.createdAt).format('YYYY-MM-DD') }} />}
                  />}
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
            disabled={loadingThink}
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onDelete}>
            <FormattedMessage id="button.delete" defaultMessage="Delete" />
          </Button>
          <Button
            disabled={loadingThink}
            variant="contained"
            startIcon={<RestoreIcon />}
            onClick={onRestore}>
            <FormattedMessage id="button.restore" defaultMessage="Restore" />
          </Button>
        </Box>
      </Box>
    </Box >
  )
}

export { ShowThinkTrashPage }
