import { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet-async'

export const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Log out | Mindfulyze</title>
      </Helmet>
      {children}
    </>
  )
}

export default Layout
