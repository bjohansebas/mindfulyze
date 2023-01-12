import { Box, Typography } from '@mui/material'
import { Combobox } from '../../components/Combobox'

const options = ['Mi semana', 'Mi mes']

function DashboardPage () {
  return (
    <Box
      component="main"
      sx={{ width: '100%' }}>
      <Box component="header" sx={{ my: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h1" fontWeight="700" sx={{ fontSize: '1.4em', textAlign: 'center' }}>Hola, Martin</Typography>
        <Combobox options={options} setOptionSelect={() => {}} />
      </Box>
    </Box >)
}

export { DashboardPage }
