import { Routes, Route } from 'react-router-dom'
import { MainPage } from './routes/Main'
import { LoginPage } from './routes/Login'
import { SignUpPage } from './routes/SignUp'
import { AccountPage } from './routes/Account'
import { NotFoundPage } from './routes/NotFound'
import { NewThinkPage } from './routes/Think/NewThink'
import { NewPlacePage } from './routes/Place/NewPlace'
import { EditThinkPage } from './routes/Think/EditThink'
import { EditPlacePage } from './routes/Place/EditPlace'
import { ThinksTrashPage } from './routes/Trash'
import { ShowThinkTrashPage } from './routes/Trash/ShowThinkTrash'
import { ArchiveThinksPage } from './routes/Archive'
import { MenuNav } from './components/Menu'
import { Box } from '@mui/material'
import { useAuth } from './hooks/useAuth'
import { RequiredAuth } from './components/RequiredAuth'
import { NoRequiredAuth } from './components/NoRequiredAuth'
import { NewProfilePage } from './routes/SignUp/NewProfile'
import { DashboardPage } from './routes/Dashboard'

function App () {
  const { isLogin } = useAuth()
  return (
    <Box sx={{ background: '#f6f6f6', display: isLogin ? 'flex' : 'block', minHeight: '100vh' }}>
      <MenuNav>
      </MenuNav>
      <Routes>
        <Route element={<NoRequiredAuth />}>
          <Route path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Route>
        <Route element={<RequiredAuth requiredProfile={true} />}>
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/account' element={<AccountPage />} />
          <Route path='/think/new' element={<NewThinkPage />} />
          <Route path='/think/:id/' element={<EditThinkPage />} />
          <Route path='/place/new' element={<NewPlacePage />} />
          <Route path='/place/:id' element={<EditPlacePage />} />
          <Route path='/trash' element={<ThinksTrashPage />} />
          <Route path='/trash/:id' element={<ShowThinkTrashPage />} />
          <Route path='/archive' element={<ArchiveThinksPage />} />
          <Route path='/archive/:id' element={<EditThinkPage />} />
        </Route>
        <Route element={<RequiredAuth requiredProfile={false} />}>
          <Route path='/account/new' element={<NewProfilePage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Box >
  )
}

export { App }
