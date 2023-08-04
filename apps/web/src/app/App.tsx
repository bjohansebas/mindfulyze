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
          const { SignLayoutPage } = await import('./signup/layout')
          return { Component: SignLayoutPage }
        },
        children: [
          {
            path: '/login',
            async lazy() {
              const { LoginPage } = await import('./login/page')
              return { Component: LoginPage }
            },
          },
          {
            path: '/signup',
            async lazy() {
              const { SignUpPage } = await import('./signup/page')
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
              const { DashboardPage } = await import('./dashboard/page')
              return { Component: DashboardPage }
            },
          },
          {
            path: 'account/new',
            async lazy() {
              const { NewProfilePage } = await import('./account/new/page')
              return { Component: NewProfilePage }
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
