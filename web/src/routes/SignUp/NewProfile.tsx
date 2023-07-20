import { Helmet } from 'react-helmet-async'

import { NewProfileForm } from '@/components/Forms/NewProfile'

function NewProfilePage(): JSX.Element {
	return (
		<>
			<Helmet>
				<title>Create profile | Mindfulyze</title>
			</Helmet>
			<NewProfileForm />
		</>
	)
}

export { NewProfilePage }
