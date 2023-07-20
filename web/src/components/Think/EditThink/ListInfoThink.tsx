import { List, ListItem, ListItemButton, ListItemText, Skeleton } from '@mui/material'
import dayjs from 'dayjs'
import { FormattedMessage } from 'react-intl'

import { type ResponsePlace } from 'services/place'
import { type ResponseThink } from 'services/think'
import { type ResponseTrash } from 'services/trash'

export interface ListInfoThinkProps {
	loadingPlace: boolean
	place: ResponsePlace | null
	loadingThink: boolean
	think: ResponseThink | ResponseTrash | null
}

export function ListInfoThink({ loadingPlace, loadingThink, place, think }: ListInfoThinkProps): JSX.Element {
	return (
		<List sx={{ width: '100%' }}>
			<ListItem sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }} key={1}>
				<ListItemButton role={undefined} dense>
					{loadingPlace && <Skeleton variant='text' width={100} />}
					{!loadingPlace && (
						<ListItemText
							primary={
								<FormattedMessage
									id='think.info.place'
									defaultMessage='Place: {name}'
									values={{ name: place?.name !== '' ? place?.name : '' }}
								/>
							}
						/>
					)}
				</ListItemButton>
			</ListItem>
			<ListItem sx={{ height: '25', borderBottom: '1px solid rgba(0,0,0,0.12)' }} key={2}>
				<ListItemButton role={undefined} dense>
					{loadingThink && <Skeleton variant='text' width={200} />}
					{!loadingThink && (
						<ListItemText
							primary={
								<FormattedMessage
									id='think.info.date'
									defaultMessage='Created at: {create}'
									values={{ create: dayjs(think?.createdAt).format('YYYY-MM-DD') }}
								/>
							}
						/>
					)}
				</ListItemButton>
			</ListItem>
		</List>
	)
}
