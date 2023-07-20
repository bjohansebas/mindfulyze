import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link } from 'react-router-dom'

export interface ItemListButton {
	text: JSX.Element
	route: string
	icon: JSX.Element
}

export interface ListNavigationProps {
	isOpen: boolean
	listButtons: ItemListButton[]
	path: string
}

export function ListNavigationLogged({ isOpen, listButtons, path }: ListNavigationProps): JSX.Element {
	return (
		<List>
			{listButtons.map(({ text, route, icon }, index) => (
				<ListItem key={index} disablePadding sx={{ display: 'block' }}>
					<ListItemButton
						component={Link}
						selected={path === route}
						sx={{
							minHeight: 40,
							marginTop: '6px',
							justifyContent: isOpen ? 'initial' : 'center',
							px: '15px',
							borderRadius: '12px',
						}}
						to={route}
					>
						<ListItemIcon
							sx={{
								minWidth: 0,
								mr: isOpen ? 3 : 'auto',
								justifyContent: 'center',
							}}
						>
							{icon}
						</ListItemIcon>
						<ListItemText primary={text} sx={{ opacity: isOpen ? 1 : 0 }} />
					</ListItemButton>
				</ListItem>
			))}
		</List>
	)
}
