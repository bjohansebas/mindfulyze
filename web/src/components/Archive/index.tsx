import DeleteIcon from '@mui/icons-material/Delete'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import {
	Box,
	Checkbox,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Menu,
	MenuItem,
	Skeleton,
	Toolbar,
	Typography,
} from '@mui/material'

import { useEffect, useState, type MouseEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

import { getArchiveThinks, moveToTrash, putThink, type ResponseThinks } from 'services/think'

import { EmptyArchive } from './EmptyArchive'

export function ArchiveUI(): JSX.Element {
	const navigate = useNavigate()

	const [anchorElTrash, setAnchorElTrash] = useState<HTMLButtonElement | null>(null)
	const [checked, setChecked] = useState<number[]>([])

	const [allArchive, setAllArchive] = useState<ResponseThinks>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [idSelect, setIdSelect] = useState<string>('')

	const getArchive = async (): Promise<void> => {
		try {
			setLoading(true)
			const response = await getArchiveThinks()

			setAllArchive(response)
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		void getArchive()
	}, [])

	const handleToggle = (value: number): void => {
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]

		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		setChecked(newChecked)
	}

	const handleTrashMenu = (event: MouseEvent<HTMLButtonElement>, id: string): void => {
		if (anchorElTrash != null) {
			setIdSelect('')
			setAnchorElTrash(null)
		} else {
			setIdSelect(id)
			setAnchorElTrash(event.currentTarget)
		}
	}

	const onDeleteId = async (): Promise<void> => {
		try {
			setAnchorElTrash(null)
			await moveToTrash(idSelect)

			handleToggle(allArchive.findIndex((val) => val.id === idSelect))
			await getArchive()
		} catch (err) {
			console.log(err)
		}
	}

	const onUnarchiveId = async (): Promise<void> => {
		try {
			setAnchorElTrash(null)

			await putThink(idSelect, { isArchive: false })

			handleToggle(allArchive.findIndex((val) => val.id === idSelect))
			await getArchive()
		} catch (err) {
			console.log(err)
		}
	}

	const onDeleteSelect = async (): Promise<void> => {
		if (checked.length > 0) {
			try {
				for await (const value of checked) {
					const archive = allArchive[value]
					await moveToTrash(archive.id)
				}
				setChecked([])
				await getArchive()
			} catch (err) {
				console.log(err)
			}
		}
	}

	const onUnarchiveSelect = async (): Promise<void> => {
		if (checked.length > 0) {
			try {
				for await (const value of checked) {
					const archive = allArchive[value]

					await putThink(archive.id, { isArchive: false })
				}
				setChecked([])
				await getArchive()
			} catch (err) {
				console.log(err)
			}
		}
	}

	return (
		<Box sx={{ width: '100%', p: '30px', height: '100vh' }}>
			<Toolbar sx={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#ffffff' }}>
				<Typography variant='h6' noWrap component='div'>
					<FormattedMessage id='archive.title' defaultMessage='Archive' />
				</Typography>
				<Box>
					<IconButton onClick={onUnarchiveSelect} disabled={checked.length === 0}>
						<UnarchiveIcon />
					</IconButton>
					<IconButton onClick={onDeleteSelect} disabled={checked.length === 0}>
						<DeleteIcon />
					</IconButton>
				</Box>
			</Toolbar>

			<Box>
				<List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, pb: '10px' }}>
					{loading && <Skeleton variant='rectangular' height={50} />}
					{!loading && allArchive.length === 0 && <EmptyArchive />}
					{!loading &&
						allArchive.length > 0 &&
						allArchive.map((value, index) => {
							const labelId = `checkbox-list-label-${index}`
							return (
								<ListItem
									key={index}
									secondaryAction={
										<IconButton
											edge='end'
											aria-label='comments'
											onClick={(e) => {
												handleTrashMenu(e, value.id)
											}}
										>
											<MoreVertIcon />
										</IconButton>
									}
									disablePadding
								>
									<ListItemButton
										role={undefined}
										onClick={() => {
											handleToggle(index)
										}}
										dense
									>
										<ListItemIcon>
											<Checkbox
												edge='start'
												checked={checked.includes(index)}
												tabIndex={-1}
												disableRipple
												inputProps={{ 'aria-labelledby': labelId }}
											/>
										</ListItemIcon>
										<ListItemText id={labelId} primary={`${value.text}`} />
									</ListItemButton>
								</ListItem>
							)
						})}
				</List>
			</Box>

			<Menu
				sx={{ mt: '40px', zIndex: 1202 }}
				id='menu-appbar'
				anchorEl={anchorElTrash}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorElTrash)}
				onClose={handleTrashMenu}
			>
				<MenuItem
					key='1'
					onClick={() => {
						navigate(`/think/${idSelect}`)
					}}
				>
					<FormattedMessage id='options.think.see' defaultMessage='See thought' />
				</MenuItem>
				<MenuItem key='2' onClick={onDeleteId}>
					<FormattedMessage id='options.think.delete' defaultMessage='Delete thought' />
				</MenuItem>
				<MenuItem key='3' onClick={onUnarchiveId}>
					<FormattedMessage id='options.think.unarchive' defaultMessage='Unarchive' />
				</MenuItem>
			</Menu>
		</Box>
	)
}
