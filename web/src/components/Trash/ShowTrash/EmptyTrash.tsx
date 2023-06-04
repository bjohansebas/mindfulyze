import { Box, Typography } from '@mui/material'

import { FormattedMessage } from 'react-intl'

export function EmptyTrash (): JSX.Element {
  return (
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gridColumn: '1/3',
      justifyContent: 'center',
      py: '20px'
    }}>
      <Typography>
        <FormattedMessage id="trash.empty" defaultMessage="You have no thoughts in the trash" />
      </Typography>
    </Box >
  )
}
