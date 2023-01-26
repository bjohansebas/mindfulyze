import { Box, Typography } from '@mui/material'

import { FormattedMessage } from 'react-intl'

function EmptyArchive () {
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
        <FormattedMessage id="archive.empty" defaultMessage="Has no archived thoughts" />
      </Typography>
    </Box >
  )
}

export { EmptyArchive }
