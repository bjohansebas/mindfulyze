import { PropsWithChildren } from 'react'
import { Helmet } from 'react-helmet-async'

export const LayoutLogin = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Log in | Mindfulyze</title>
      </Helmet>
      {children}
    </>
  )
}

export default LayoutLogin
