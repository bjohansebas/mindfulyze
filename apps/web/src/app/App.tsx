import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Loading } from './loading'

import { ErrorPage } from '../routes/Error'

const router = createBrowserRouter([
  {
    async lazy() {
      const { Layout } = await import('./layout')
      return { Component: Layout }
    },
    errorElement: <ErrorPage />,
    children: [
      {
        async lazy() {
          const { SignLayoutPage } = await import('../routes/SignLayout')
          return { Component: SignLayoutPage }
        },
        children: [
          {
            path: '/login',
            async lazy() {
              const { LoginPage } = await import('../routes/Login')
              return { Component: LoginPage }
            },
          },
          {
            path: '/signup',
            async lazy() {
              const { SignUpPage } = await import('../routes/SignUp')
              return { Component: SignUpPage }
            },
          },
        ],
      },
      {
        async lazy() {
          const { RequiredAuth } = await import('../routes/Main/RequiredAuth')
          return { Component: RequiredAuth }
        },
        children: [
          {
            index: true,
            async lazy() {
              const { DashboardPage } = await import('../routes/Dashboard')
              return { Component: DashboardPage }
            },
          },
          {
            path: 'account',
            async lazy() {
              const { AccountPage } = await import('../routes/Account')
              return { Component: AccountPage }
            },
          },
          {
            path: 'account/new',
            async lazy() {
              const { NewProfilePage } = await import('../routes/SignUp/NewProfile')
              return { Component: NewProfilePage }
            },
          },
          {
            path: 'think/:id',
            async lazy() {
              const { EditThinkPage } = await import('../routes/Think')
              return { Component: EditThinkPage }
            },
          },
          {
            path: 'think/new',
            async lazy() {
              const { NewThinkPage } = await import('../routes/Think')
              return { Component: NewThinkPage }
            },
          },
          {
            path: 'place/new',
            async lazy() {
              const { NewPlacePage } = await import('../routes/Place')
              return { Component: NewPlacePage }
            },
          },
          {
            path: 'place/:id',
            async lazy() {
              const { ShowPlacePage } = await import('../routes/Place')
              return { Component: ShowPlacePage }
            },
          },
          {
            path: 'place/:id/edit',
            async lazy() {
              const { EditPlacePage } = await import('../routes/Place')
              return { Component: EditPlacePage }
            },
          },
          {
            path: 'logout',
            async lazy() {
              const { LogoutPage } = await import('./logout/page')
              return { Component: LogoutPage }
            },
          },
        ],
      },
    ],
  },
])

export const App = (): JSX.Element => {
  return <RouterProvider router={router} fallbackElement={<Loading />} />
}

export default App
