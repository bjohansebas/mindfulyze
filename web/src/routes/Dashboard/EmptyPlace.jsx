import { Box, Button, Typography } from '@mui/material'

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

function EmptyPlace () {
  return (
    <Box sx={{
      height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gridColumn: '1/3'
    }}>
      <Typography>
        <FormattedMessage id="dashboard.place.empty" defaultMessage="Create your first place." />
      </Typography>
      <Button component={Link} to="/place/new">
        <FormattedMessage id="menu.add.place" defaultMessage="New place" />
      </Button>
    </Box >
  )
}

export { EmptyPlace }
