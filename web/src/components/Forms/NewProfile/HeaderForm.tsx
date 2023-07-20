import { Box, Typography } from '@mui/material'

import { Banner } from 'components/Banner'

export function HeaderFormNewProfile(): JSX.Element {
	return (
		<Box component='header' sx={{ display: 'flex', alignItems: 'center', gap: '24px', flexDirection: 'column' }}>
			<Box>
				<Banner widthFavicon={40} heightText={24.26} widthText={230} color='#FFFFFF' />
			</Box>
			<Box sx={{ display: 'flex' }}>
				<Box sx={{ width: '100%', px: '8px', gap: '8px', display: 'flex', flexDirection: 'column' }}>
					<Typography
						variant='h1'
						color='primary.contrastText'
						sx={{ fontSize: { md: '1.714rem', xs: '1.429rem' }, fontWeight: '700' }}
					>
						Thank you for joining Mindfulyze.
					</Typography>
					<Typography
						variant='h2'
						color='primary.contrastText'
						sx={{ fontSize: '1.143rem', fontWeight: '500', lineHeight: '120%' }}
					>
						Start your new path of emotional control! Begin managing your emotions and transform your life.
					</Typography>
				</Box>
			</Box>
		</Box>
	)
}
