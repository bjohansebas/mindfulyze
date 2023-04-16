import { Box, Button, Typography } from '@mui/material'

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

function EmptyStatistics () {
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography>
        <FormattedMessage id="dashboard.statistics.empty" defaultMessage="It seems like you don't have any thoughts associated with the selected emotion." />
      </Typography>
      <Button component={Link} to="/think/new">
        <FormattedMessage id="menu.add.think" defaultMessage="New think" />
      </Button>
    </Box>
  )
}

export { EmptyStatistics }
