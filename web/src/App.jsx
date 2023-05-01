import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MainPage } from './routes/Main'
import { LoginPage } from './routes/Login'
import { SignUpPage } from './routes/SignUp'
import { AccountPage } from './routes/Account'
import { NewProfilePage } from './routes/SignUp/NewProfile'
import { DashboardPage } from './routes/Dashboard'
import { ErrorPage } from './routes/Error'
import { SignLayoutPage } from './routes/SignLayout'
import { NewThinkPage, EditThinkPage } from './routes/Think'
import { NewPlacePage, ShowPlacePage, EditPlacePage } from './routes/Place'
import { TrashPage, ShowThinkTrashPage } from './routes/Trash'
import { ArchivePage } from './routes/Archive'
import { RequiredAuth } from './routes/Main/RequiredAuth'
import { LogoutPage } from './routes/Logout/'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RequiredAuth />,
        children: [
          {
            index: true,
            element: <DashboardPage />
          }, {
            path: 'account',
            element: <AccountPage />
          }, {
            path: 'account/new',
            element: <NewProfilePage />
          }, {
            path: 'think/:id',
            element: <EditThinkPage />
          }, {
            path: 'think/new',
            element: <NewThinkPage />
          }, {
            path: 'place/new',
            element: <NewPlacePage />
          }, {
            path: 'place/:id',
            element: <ShowPlacePage />
          }, {
            path: 'place/:id/edit',
            element: <EditPlacePage />
          }, {
            path: 'trash/',
            element: <TrashPage />
          }, {
            path: 'trash/:id',
            element: <ShowThinkTrashPage />
          }, {
            path: 'archive',
            element: <ArchivePage />
          }, {
            path: 'logout',
            element: <LogoutPage/>
          }
        ]
      }
    ]
  },
  {
    element: <SignLayoutPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/signup',
        element: <SignUpPage />
      }
    ]
  }
])

function App () {
  return (
    <RouterProvider router={router} />
  )
}

export { App }
