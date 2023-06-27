import { Box, Button, Typography } from '@mui/material'

import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

export function EmptyThink (): JSX.Element {
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
        <FormattedMessage id="place.think.empty" defaultMessage="It seems like you don't have any thoughts associated with this place." />
      </Typography>
      <Button component={Link} to="/think/new">
        <FormattedMessage id="menu.add.think" defaultMessage="New think" />
      </Button>
    </Box >
  )
}
