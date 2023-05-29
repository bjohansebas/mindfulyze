import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ErrorPage } from './routes/Error'
import { Loading } from './components/Loading'

const router = createBrowserRouter([
  {
    async lazy () {
      const { MainPage } = await import('./routes/Main')
      return { Component: MainPage }
    },
    errorElement: <ErrorPage />,
    children: [
      {
        async lazy () {
          const { SignLayoutPage } = await import('./routes/SignLayout')
          return { Component: SignLayoutPage }
        },
        children: [
          {
            path: '/login',
            async lazy () {
              const { LoginPage } = await import('./routes/Login')
              return { Component: LoginPage }
            }
          },
          {
            path: '/signup',
            async lazy () {
              const { SignUpPage } = await import('./routes/SignUp')
              return { Component: SignUpPage }
            }
          }
        ]
      },
      {
        async lazy () {
          const { RequiredAuth } = await import('./routes/Main/RequiredAuth')
          return { Component: RequiredAuth }
        },
        children: [
          {
            index: true,
            async lazy () {
              const { DashboardPage } = await import('./routes/Dashboard')
              return { Component: DashboardPage }
            }
          }, {
            path: 'account',
            async lazy () {
              const { AccountPage } = await import('./routes/Account')
              return { Component: AccountPage }
            }
          }, {
            path: 'account/new',
            async lazy () {
              const { NewProfilePage } = await import('./routes/SignUp/NewProfile')
              return { Component: NewProfilePage }
            }
          }, {
            path: 'think/:id',
            async lazy () {
              const { EditThinkPage } = await import('./routes/Think')
              return { Component: EditThinkPage }
            }
          }, {
            path: 'think/new',
            async lazy () {
              const { NewThinkPage } = await import('./routes/Think')
              return { Component: NewThinkPage }
            }
          }, {
            path: 'place/new',
            async lazy () {
              const { NewPlacePage } = await import('./routes/Place')
              return { Component: NewPlacePage }
            }
          }, {
            path: 'place/:id',
            async lazy () {
              const { ShowPlacePage } = await import('./routes/Place')
              return { Component: ShowPlacePage }
            }
          }, {
            path: 'place/:id/edit',
            async lazy () {
              const { EditPlacePage } = await import('./routes/Place')
              return { Component: EditPlacePage }
            }
          }, {
            path: 'trash/',
            async lazy () {
              const { TrashPage } = await import('./routes/Trash')
              return { Component: TrashPage }
            }

          }, {
            path: 'trash/:id',
            async lazy () {
              const { ShowThinkTrashPage } = await import('./routes/Trash')
              return { Component: ShowThinkTrashPage }
            }
          }, {
            path: 'archive',
            async lazy () {
              const { ArchivePage } = await import('./routes/Archive')
              return { Component: ArchivePage }
            }
          }, {
            path: 'logout',
            async lazy () {
              const { LogoutPage } = await import('./routes/Logout')
              return { Component: LogoutPage }
            }
          }
        ]
      }
    ]
  }
])

function App () {
  return <RouterProvider router={router} fallbackElement={<Loading />} />
}

export { App }
