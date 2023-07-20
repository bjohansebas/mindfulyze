import MoodBadRoundedIcon from '@mui/icons-material/MoodBadRounded'
import MoodRoundedIcon from '@mui/icons-material/MoodRounded'
import { Skeleton, Stack, Typography } from '@mui/material'

export interface StatisctisHeaderProps {
	emotions: number[]
	isLoading: boolean
}

export const StatisticsHeader = ({ emotions, isLoading }: StatisctisHeaderProps): JSX.Element => {
	return (
		<Stack
			component='header'
			direction='row'
			py='10px'
			px='24px'
			width='100%'
			useFlexGap
			flexWrap='wrap'
			justifyContent='space-between'
			spacing={2}
		>
			<Typography variant='h2' fontSize='20px' fontWeight={600} color='primary.dark' margin='auto'>
				Estadisticas
			</Typography>
			<Stack direction='row' spacing={2} useFlexGap flexWrap='wrap' justifyContent='center' margin='auto'>
				<Typography color='primary' alignItems='center' display='flex' gap='4px'>
					{isLoading ? (
						<Skeleton variant='text' width='200px' />
					) : (
						<>
							<MoodRoundedIcon /> {emotions[0]} Emociones positivas
						</>
					)}
				</Typography>
				<Typography color='error.dark' alignItems='center' display='flex' gap='4px'>
					{isLoading ? (
						<Skeleton variant='text' width='200px' />
					) : (
						<>
							<MoodBadRoundedIcon /> {emotions[1]} Emociones negativas
						</>
					)}
				</Typography>
			</Stack>
		</Stack>
	)
}
