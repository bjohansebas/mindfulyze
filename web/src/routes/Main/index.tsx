import { Container } from '@mui/material'

import { Outlet } from 'react-router-dom'

function MainPage() {
  return (
    <Container>
      <Outlet />
    </Container>
  )
}

export { MainPage }
