import { Delete as DeleteIcon, Restore as RestoreIcon } from '@mui/icons-material'
import { Box, Button } from '@mui/material'

import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'

import { BadRequestError, NotFoundError } from '@/errors/typeErrors'
import { AutocompleteField, type OptionsProps } from 'components/Fields/Autocomplete'
import { TextAreaField } from 'components/Fields/TextArea'
import { ListInfoThink } from 'components/Think/EditThink/ListInfoThink'
import { type ResponsePlace } from 'services/place'
import { deleteThinkFromTrash, getTrash, restoreFromTrash, type ResponseTrash } from 'services/trash'

export function ShowThinkTrashUI(): JSX.Element {
  const { id } = useParams()
  const navigate = useNavigate()

  const [think, setThink] = useState<ResponseTrash | null>(null)
  const [loadingThink, setLoadingThink] = useState(true)

  const [place, setPlace] = useState<ResponsePlace | null>(null)
  const [loadingPlace, setLoadingPlace] = useState<boolean>(true)

  const [emotions, setEmotions] = useState<OptionsProps[]>([])

  const getThink = async (): Promise<void> => {
    if (id == null) return
    try {
      const response = await getTrash(id)
      setThink(response)
      if (response?.emotions != null) {
        setEmotions(
          response?.emotions.map((value) => {
            return {
              id: value.emotion.id,
              text: value.emotion.name,
            }
          }),
        )
      }

      setPlace(response.place)
    } catch (err) {
      if (err instanceof NotFoundError || err instanceof BadRequestError) {
        navigate('/')
      }
    } finally {
      setLoadingThink(false)
      setLoadingPlace(false)
    }
  }

  useEffect(() => {
    void getThink()
  }, [])

  const onDelete = async (): Promise<void> => {
    if (id == null || place == null) return

    try {
      await deleteThinkFromTrash(id)

      navigate(`/place/${place.id}`, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  const onRestore = async (): Promise<void> => {
    if (id == null || place == null) return

    try {
      await restoreFromTrash(id)

      navigate(`/place/${place.id}`, { replace: true })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Box
      sx={{
        p: '30px',
        height: { xs: '100%', md: '480px' },
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '60%' },
          height: { xs: '300px', md: '100%' },
          background: '#ffffff',
        }}
      >
        <TextAreaField disabled={true} text={think?.text == null ? '' : think?.text} />
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
          pb: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ pt: '10px' }}>
            <AutocompleteField disabled={true} select={emotions} setSelect={setEmotions} options={emotions} />
            <ListInfoThink place={place} think={think} loadingPlace={loadingPlace} loadingThink={loadingThink} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', gap: 2 }}>
          <Button
            variant='contained'
            size='large'
            onClick={() => {
              navigate(-1)
            }}
          >
            <FormattedMessage id='button.back' defaultMessage='Back' />
          </Button>
          <Button disabled={loadingThink} variant='contained' startIcon={<DeleteIcon />} onClick={onDelete}>
            <FormattedMessage id='button.delete' defaultMessage='Delete' />
          </Button>
          <Button disabled={loadingThink} variant='contained' startIcon={<RestoreIcon />} onClick={onRestore}>
            <FormattedMessage id='button.restore' defaultMessage='Restore' />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
