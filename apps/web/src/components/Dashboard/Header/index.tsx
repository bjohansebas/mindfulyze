import { Button, Stack, Typography } from '@mui/material'

import BubbleChartIcon from '@mui/icons-material/BubbleChart'
import WorkspacesIcon from '@mui/icons-material/Workspaces'

import { Link } from 'react-router-dom'

import { useApp } from '@/hooks/useApp'

export const UserWelcomeHeader = (): JSX.Element => {
  const { userInfo } = useApp()

  return (
    <Stack
      component='header'
      sx={{
        justifyContent: 'space-between',
        width: '100%',
        px: { xs: '0', sm: '16px', md: '32px' },
        py: '12px',
      }}
      direction='row'
      useFlexGap
      flexWrap='wrap'
      spacing={2}
    >
      <Typography
        variant='h1'
        fontWeight='700'
        color='secondary.dark'
        sx={{
          fontSize: '1.7em',
          textAlign: 'center',
          textTransform: 'capitalize',
          margin: 'auto',
        }}
      >
        Hola, {userInfo?.profile?.firstName} {userInfo?.profile?.lastName}
      </Typography>
      <Stack
        direction='row'
        spacing={{ md: 4, xs: 2 }}
        justifyContent='center'
        useFlexGap
        flexWrap='wrap'
        sx={{ margin: 'auto' }}
      >
        <Button
          component={Link}
          sx={{ width: { xs: '100%', sm: 'initial' } }}
          variant='outlined'
          startIcon={<WorkspacesIcon />}
          to='/place/new'
        >
          Nuevo lugar
        </Button>
        <Button
          component={Link}
          sx={{ width: { xs: '100%', sm: 'initial' } }}
          variant='contained'
          startIcon={<BubbleChartIcon />}
          to='/think/new'
        >
          Nuevo pensamiento
        </Button>
      </Stack>
    </Stack>
  )
}
