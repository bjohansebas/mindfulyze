import { Helmet } from 'react-helmet-async'

import { LoginForm } from 'components/Forms/Login'

function LoginPage (): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Log in | Mindfulyze</title>
      </Helmet>
      <LoginForm />
    </>)
}

export { LoginPage }
