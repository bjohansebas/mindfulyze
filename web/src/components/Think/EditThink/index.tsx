import { Box, Button, Toolbar } from '@mui/material'
import { Delete as DeleteIcon, Archive as ArchiveIcon } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'

import { useAuth } from 'hooks/useAuth'
import { getThink, moveToTrash, putAddEmotion, putDeleteEmotion, putThink, type ResponseThink } from 'services/think'
import { getAllEmotions } from 'services/emotion'

import { type ResponsePlace } from 'services/place'
import { AutocompleteField, type OptionsProps } from '../../Fields/Autocomplete'
import { TextAreaField } from '../../Fields/TextArea'
import { ListInfoThink } from './ListInfoThink'
import { BadRequestError, NotFoundError } from '@/errors/typeErrors'

export function EditThinkUI (): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()
  const { accessToken } = useAuth()

  const [think, setThink] = useState<ResponseThink | null>(null)
  const [loadingThink, setLoadingThink] = useState(true)

  const [place, setPlace] = useState<ResponsePlace | null>(null)
  const [loadingPlace, setLoadingPlace] = useState(true)

  const [emotions, setEmotions] = useState<OptionsProps[] | null>(null)

  const [allEmotions, setAllEmotions] = useState<OptionsProps[]>([])
  const [loadingAllEmotions, setLoadingAllEmotions] = useState<boolean>(true)

  const [newTextThink, setNewTextThink] = useState<string>('')
  const [newEmotionsThink, setNewEmotionsThink] = useState<OptionsProps[]>([])
  const [loadingSave, setLoadingSave] = useState<boolean>(false)

  const gettingThink = async (): Promise<void> => {
    try {
      if (id == null || accessToken == null) return

      const response = await getThink(id, accessToken)
      setThink(response)
      if ((response?.emotions) != null) {
        setEmotions(response?.emotions.map(value => {
          return {
            id: value.emotion.id,
            text: value.emotion.name
          }
        }
        ))
      }
      setPlace(response.place)
      setNewTextThink(response.text)
    } catch (err) {
      if (err instanceof BadRequestError || err instanceof NotFoundError) {
        navigate('/')
      }
    } finally {
      setLoadingThink(false)
      setLoadingPlace(false)
    }
  }

  useEffect(() => {
    void gettingThink()
  }, [])

  useEffect(() => {
    async function getEmotions (): Promise<void> {
      if (accessToken == null) return
      try {
        const response = await getAllEmotions(accessToken)

        setAllEmotions(response.map(value => {
          return {
            id: value.id,
            text: value.name
          }
        }))
      } catch (e) {
        console.log(e)
      } finally {
        setLoadingAllEmotions(false)
      }
    }

    void getEmotions()
  }, [])

  useEffect(() => {
    if (emotions != null) {
      setNewEmotionsThink(emotions)
    }
  }, [emotions])

  const onDelete = async (): Promise<void> => {
    if (id == null || think == null || accessToken == null) return

    try {
      setLoadingSave(true)
      setLoadingThink(true)

      await moveToTrash(id, accessToken)

      navigate(`/place/${think.place.id}`, { replace: true })
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingSave(false)
      setLoadingThink(false)
    }
  }

  const onArchive = async (): Promise<void> => {
    if (id == null || think == null || accessToken == null) return

    try {
      setLoadingSave(true)
      setLoadingThink(true)

      await putThink(id, { isArchive: true }, accessToken)

      navigate(`/place/${think.place.id}`, { replace: true })
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingSave(false)
      setLoadingThink(false)
    }
  }

  const onSave = async (): Promise<void> => {
    if (id == null || newEmotionsThink == null || accessToken == null || emotions == null || think == null) return

    setLoadingSave(true)
    if (JSON.stringify(emotions) !== JSON.stringify(newEmotionsThink)) {
      const emotionsList = newEmotionsThink.map(value => value.id)

      await putAddEmotion(id, emotionsList, accessToken)

      const listRemoveEmotions = []
      for await (const value of emotions) {
        if (!newEmotionsThink.some(obj => obj.id === value.id)) {
          listRemoveEmotions.push(value.id)
        }
      }

      if (listRemoveEmotions.length > 0) {
        try {
          await putDeleteEmotion(id, listRemoveEmotions, accessToken)
        } catch (err) {
          console.log(err)
        }
      }
    }

    if (think.text !== newTextThink.trimEnd()) {
      try {
        const request = { text: newTextThink.trimEnd() }

        await putThink(id, request, accessToken)
      } catch (err) {
        console.log(err)
      }
    }
    setLoadingSave(false)
    navigate(`/place/${think.place.id}`, { replace: true })
  }

  return (
    <Box sx={{
      p: '30px',
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
        <TextAreaField
          loading={loadingThink}
          text={newTextThink}
          setText={setNewTextThink}
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
              disabled={loadingThink}
              onClick={onDelete}>
              <FormattedMessage id="button.delete" defaultMessage="Delete" />
            </Button>
            <Button
              variant="text"
              startIcon={<ArchiveIcon />}
              disabled={loadingThink}
              onClick={onArchive}>
              <FormattedMessage id="button.archive" defaultMessage="Archive" />
            </Button>
          </Toolbar>

          <Box sx={{ pt: '10px' }}>
            <AutocompleteField
              options={allEmotions}
              loading={loadingAllEmotions}
              select={newEmotionsThink}
              setSelect={setNewEmotionsThink} />
            <ListInfoThink place={place} think={think} loadingPlace={loadingPlace} loadingThink={loadingThink} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => { navigate(-1) }}>
            <FormattedMessage id="button.back" defaultMessage="Back" />
          </Button>
          <Button
            variant="contained"
            onClick={onSave}
            disabled={
              loadingSave || loadingThink || (!!(newTextThink === think?.text || newTextThink.trimEnd().length < 5) && !!(JSON.stringify(emotions) === JSON.stringify(newEmotionsThink)))}
          >
            <FormattedMessage id="button.save" defaultMessage="Save" />
          </Button>
        </Box>
      </Box>
    </Box >
  )
}
