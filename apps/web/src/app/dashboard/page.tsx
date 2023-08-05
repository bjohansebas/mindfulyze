import { Helmet } from 'react-helmet-async'

export function DashboardPage(): JSX.Element {
  return (
    <div className='w-full'>
      <Helmet>
        <title>Dashboard | Mindfulyze</title>
      </Helmet>
    </div>
  )
}
