import 'chart.js/auto'

import { Box, Paper, Skeleton, Stack } from '@mui/material'

import { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

import { getStatisticsAll } from 'services/statistics'
import { type ResponseRelationEmotion } from 'services/think'

import { EmptyStatistics } from './EmptyStatistics'
import { StatisticsHeader } from './StatisticsHeader'

export const ShowStatistics = (): JSX.Element => {
	const [loading, setLoading] = useState(true)

	const [dataEmotions, setDataEmotions] = useState<number[]>([])

	const data = {
		labels: ['Positive', 'Negative'],
		datasets: [
			{
				label: 'Emociones',
				data: dataEmotions,
				backgroundColor: ['#00575C', '#c62828'],
			},
		],
	}

	const getStatistics = async (): Promise<void> => {
		try {
			setLoading(true)

			const dataResponse: ResponseRelationEmotion[] = await getStatisticsAll()

			const positive = dataResponse.filter(({ emotion }) => emotion.type === 'Positive').length
			const negative = dataResponse.filter(({ emotion }) => emotion.type === 'Negative').length

			setDataEmotions([positive, negative])
		} catch (e) {
			console.log(e)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		void getStatistics()
	}, [])

	return (
		<Paper sx={{ borderRadius: '8px', p: '16px' }} elevation={0}>
			<Stack spacing={3}>
				<StatisticsHeader emotions={dataEmotions} isLoading={loading} />
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<Box sx={{ height: '100%' }}>
						{loading && <Skeleton variant='circular' height={300} width={300} />}
						{!loading && dataEmotions.length === 0 && <EmptyStatistics />}
						{!loading && dataEmotions.length > 0 && (
							<Doughnut
								data={data}
								options={{
									responsive: true,
									maintainAspectRatio: false,
									cutout: 0,
									layout: {
										padding: {
											left: 0,
											top: 0,
											bottom: 0,
											right: 0,
										},
									},
								}}
								width={300}
								height={300}
							/>
						)}
					</Box>
				</Box>
			</Stack>
		</Paper>
	)
}
