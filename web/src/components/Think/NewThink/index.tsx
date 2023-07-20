import { Box, Button, ButtonGroup, TextareaAutosize } from '@mui/material'

import { useEffect, useState, type FormEvent } from 'react'
import { FormattedMessage } from 'react-intl'
import { Link, useNavigate } from 'react-router-dom'

import { ComboboxField } from 'components/Fields/Combobox'
import { Forms } from 'components/Form'

import { AutocompleteField, type OptionsProps } from 'components/Fields/Autocomplete'
import { getAllEmotions } from 'services/emotion'
import { getAllPlaces, type ResponsePlace } from 'services/place'
import { postThink, putAddEmotion, type NewThink } from 'services/think'

export function NewThinkUI(): JSX.Element {
	const navigate = useNavigate()

	const [textThink, setTextThink] = useState<string>('')
	const [allPlaces, setAllPlaces] = useState<ResponsePlace[]>([])
	const [place, setPlace] = useState<ResponsePlace>()

	const [loading, setLoading] = useState<boolean>(true)

	const [allEmotions, setAllEmotions] = useState<OptionsProps[]>([])
	const [loadingAllEmotions, setLoadingAllEmotions] = useState<boolean>(true)

	const [emotionsSelect, setEmotionsSelect] = useState<OptionsProps[]>([])

	useEffect(() => {
		async function getPlace(): Promise<void> {
			setLoading(true)
			const response = await getAllPlaces()

			setAllPlaces(response)

			setLoading(false)
		}

		void getPlace()
	}, [])

	useEffect(() => {
		async function getEmotions(): Promise<void> {
			try {
				const response = await getAllEmotions()

				setAllEmotions(
					response.map((value) => {
						return {
							id: value.id,
							text: value.name,
						}
					}),
				)
			} catch (e) {
				console.log(e)
			} finally {
				setLoadingAllEmotions(false)
			}
		}

		void getEmotions()
	}, [])

	const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault()

		setLoading(true)
		if (textThink.trimEnd().length < 5 && textThink.trimEnd().length > 1000) {
			setLoading(false)
			return
		}

		if (place == null) return

		try {
			const request: NewThink = {
				text: textThink.trimEnd(),
				place: place.id,
			}

			const response = await postThink(request)

			const thinkId = response?.id

			const emotions = emotionsSelect.map((value) => value.id)

			try {
				await putAddEmotion(thinkId, emotions)
			} catch (e) {
				console.log('error')
			}

			navigate(`/place/${place.id}`)
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'normal',
				flexDirection: 'column',
				alignItems: 'center',
				py: '40px',
				width: '100%',
				mx: { sm: '10px', md: 0 },
			}}
		>
			<Box
				sx={{
					display: 'flex',
					justifyContent: ' center',
					flexDirection: 'column',
					width: { sm: '100%', md: '70%' },
					gap: 3,
					p: '30px',
					borderRadius: '10px',
					background: '#ffffff',
				}}
			>
				<Forms
					title={<FormattedMessage id='think.new.title' defaultMessage='Create new a think' />}
					isCancel={true}
					disableSubmit={loading || textThink.length < 5 || emotionsSelect.length < 1 || allPlaces.length === 0}
					submitText={<FormattedMessage id='think.new.submit' defaultMessage='Create a think' />}
					handleSubmit={handleSubmit}
				>
					<TextareaAutosize
						style={{ resize: 'none', minHeight: '56px', maxHeight: '200px', fontSize: '16px' }}
						value={textThink}
						onChange={(e) => {
							setTextThink(e.target.value)
						}}
						required
					/>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: {
								xs: 'start',
								sm: 'center',
							},
							flexDirection: { xs: 'column', lg: 'row' },
							gap: 2,
						}}
					>
						<Box
							sx={{
								display: 'flex',
								gap: {
									xs: 1,
									sm: 3,
								},
								alignItems: 'start',
								flexDirection: { xs: 'column', sm: 'row' },
							}}
						>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}
							>
								<ButtonGroup variant='text' aria-label='outlined button group'>
									<Button variant='contained'>
										<FormattedMessage id='select.new.think' defaultMessage='Think' />
									</Button>
									<Button component={Link} to='/place/new'>
										<FormattedMessage id='select.new.place' defaultMessage='Place' />
									</Button>
								</ButtonGroup>
							</Box>
							{!loading && allPlaces.length === 0 && (
								<Button component={Link} to='/place/new'>
									<FormattedMessage id='place.empty.button' defaultMessage='You must create your first place' />
								</Button>
							)}
							{allPlaces.length > 0 && <ComboboxField options={allPlaces} setOptionSelect={setPlace} />}
						</Box>
						<Box sx={{ width: '300px' }}>
							<AutocompleteField
								select={emotionsSelect}
								setSelect={setEmotionsSelect}
								options={allEmotions}
								loading={loadingAllEmotions}
							/>
						</Box>
					</Box>
				</Forms>
			</Box>
		</Box>
	)
}
