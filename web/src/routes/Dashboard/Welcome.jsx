import { Box, Button, Divider, Skeleton, Typography } from '@mui/material'
import { Circle } from '@mui/icons-material'

import { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import axios from '../../api/axios'
import { useAuth } from '../../hooks/useAuth'

function Welcome () {
  const { userInfo, credential } = useAuth()

  const [emotions, setEmotions] = useState([0, 0])
  const [loading, setLoading] = useState(true)

  const getEmotions = async () => {
    try {
      const response = await axios.get('/statistics/all', {
        headers: {
          Authorization: `Bearer ${credential}`
        }
      })

      const dataResponse = response?.data
      const positive = dataResponse.filter(value => value.emotion.type === 'Positive').length
      const negative = dataResponse.filter(value => value.emotion.type === 'Negative').length

      setEmotions([positive, negative])
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getEmotions()
  }, [])

  return (
    <Box component="header" sx={{
      my: '20px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: 3
    }}>
      <Typography variant="h1" fontWeight="700" sx={{
        fontSize: '1.7em',
        textAlign: 'center'
      }}>
        <FormattedMessage id="dashboard.welcome" defaultMessage="Welcome" /> {userInfo?.profile?.firstName} {userInfo?.profile?.lastName}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {loading
          ? <Skeleton variant='rounded' width={360} height={48} />
          : <Box sx={{
            display: 'flex',
            background: 'rgba(0, 87, 92, 0.04)',
            alignItems: 'center',
            borderRadius: { xs: '30px', sm: '60px' },
            flexDirection: { xs: 'column', sm: 'row' },
            height: { xs: 'auto', md: '48px' },
            py: '8px',
            px: '16px',
            gap: {
              xs: 1, sm: 3
            }
          }}>
            <Typography>
              <FormattedMessage id="dashboard.emotion" defaultMessage="Your emotions" />
            </Typography>
            <Divider orientation='vertical' sx={{ display: { xs: 'none', sm: 'block' } }} />
            <Divider orientation='horizontal' sx={{ display: { xs: 'block', sm: 'none' }, width: '100%' }} />
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
              <Button startIcon={<Circle sx={{ color: '#98CA3F' }} />}>
                {emotions[0]} <FormattedMessage id="dashboard.positive" defaultMessage="Positive emotions" />
              </Button>
              <Button startIcon={<Circle sx={{ color: '#940019' }} />}>
                {emotions[1]} <FormattedMessage id="dashboard.negative" defaultMessage="Negative emotions" />
              </Button>
            </Box>
          </Box>}
      </Box>
    </Box>
  )
}

export { Welcome }
