import { Helmet } from 'react-helmet-async'

import { AccountForm } from 'components/Forms/Account'

function AccountPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Account | Mindfulyze</title>
      </Helmet>
      <AccountForm />
    </>
  )
}

export { AccountPage }
