import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Button, ButtonGroup } from '@mui/material'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import { useEffect, useRef, useState, type Dispatch, type MouseEvent, type SetStateAction } from 'react'

export interface OptionComboboxProps {
	id: string
	name: string
}

export interface ComboboxFieldProps<T extends OptionComboboxProps> {
	options: T[]
	setOptionSelect: Dispatch<SetStateAction<T | undefined>>
}

export function ComboboxField<T extends OptionComboboxProps>({
	options,
	setOptionSelect,
}: ComboboxFieldProps<T>): JSX.Element {
	const anchorRef = useRef<HTMLDivElement>(null)

	const [open, setOpen] = useState<boolean>(false)
	const [selectedIndex, setSelectedIndex] = useState<number>(0)

	useEffect(() => {
		setOptionSelect(options[selectedIndex])
	}, [selectedIndex, options])

	const handleMenuItemClick = (_: MouseEvent<HTMLLIElement, globalThis.MouseEvent>, index: number): void => {
		setSelectedIndex(index)
		setOpen(false)
	}

	const handleToggle = (): void => {
		setOpen((prevOpen) => !prevOpen)
	}

	const handleClose = (): void => {
		setOpen(false)
	}

	return (
		<Box>
			<ButtonGroup variant='contained' ref={anchorRef} aria-label='split button'>
				<Button>{options[selectedIndex]?.name}</Button>
				<Button
					size='small'
					aria-controls={open ? 'split-button-menu' : undefined}
					aria-expanded={open ? 'true' : undefined}
					aria-haspopup='menu'
					onClick={handleToggle}
				>
					<ArrowDropDownIcon />
				</Button>
			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1,
				}}
				open={open}
				anchorEl={anchorRef.current}
				role={undefined}
				transition
				disablePortal
			>
				{({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						style={{
							transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
						}}
					>
						<Paper>
							<ClickAwayListener onClickAway={() => handleClose}>
								<MenuList id='split-button-menu' autoFocusItem>
									{options.map((option, index) => (
										<MenuItem
											key={index}
											selected={index === selectedIndex}
											onClick={(event) => {
												handleMenuItemClick(event, index)
											}}
										>
											{option?.name}
										</MenuItem>
									))}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</Box>
	)
}
