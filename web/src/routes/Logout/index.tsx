import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import { Box, Button, Typography } from '@mui/material'

import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'

import { Banner } from '@/components/Banner'
import PaletteFormProvider from '@/components/Forms/Theme'
import { useAuth } from '@/hooks/useAuth'

export function LogoutPage(): JSX.Element {
  const navigate = useNavigate()
  const { logoutAction } = useAuth()

  const cancelAction = (): void => {
    navigate('/')
  }

  return (
    <>
      <Helmet>
        <title>Log out | Mindfulyze</title>
      </Helmet>
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          background: 'linear-gradient(45deg, #00575C 0%, #002d32 100%)',
          backgroundPosition: '0 0',
          backgroundSize: '100% 100%',
          py: { sm: '40px', xs: '0' },
        }}
      >
        <PaletteFormProvider>
          <Box
            sx={{
              background: '#Fffff',
              display: 'flex',
              justifyContent: ' center',
              alignItems: 'center',
              flexDirection: 'column',
              position: 'relative',
              height: '100%',
              width: { xs: '90%', sm: '50%', md: '40%', lg: '40%' },
              gap: 4,
              p: { sm: '40px 32px', xs: '40px 16px' },
              borderRadius: '12px',
            }}
          >
            <Box sx={{ position: 'absolute', top: '24px' }}>
              <Banner color='#ffff' widthText={260} heightText={26.96} widthFavicon={60} />
            </Box>
            <LogoutRoundedIcon sx={{ color: '#ffff', fontSize: '62px' }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Typography
                variant='h1'
                fontWeight='600'
                textAlign='center'
                sx={{
                  color: '#ffff',
                  fontSize: { xs: '1.286rem', sm: '1.429rem', md: '1.643rem' },
                }}
              >
                Are you sure you want to sign out?
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, width: '100%', alignItems: 'center' }}>
                <Button color='primary' variant='contained' sx={{ width: '100%' }} onClick={logoutAction}>
                  Log out
                </Button>
                <Button color='primary' variant='outlined' sx={{ width: '100%' }} onClick={cancelAction}>
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </PaletteFormProvider>
      </Box>
    </>
  )
}
