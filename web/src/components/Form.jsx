import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

function Forms ({ handleSubmit, title, submitText, children, disableSubmit, isCancel, cancelRoute }) {
  const navigate = useNavigate()
  const cancel = cancelRoute || '/'

  return (
    <>
      <Typography variant='h1' sx={{ fontSize: '1.4em', textAlign: 'center', mb: '10px' }}>{title}</Typography>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {children}
        </Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 2 }}>
          {isCancel &&
            <Button
              disabled={disableSubmit}
              type='submit'
              variant='contained'
              size='large'
              onClick={() => navigate(cancel)}>
              <FormattedMessage id="button.cancel" defaultMessage="Cancel" />
            </Button>
          }
          <Button disabled={disableSubmit} type='submit' variant='contained' size='large'>{submitText}</Button>
        </Box>
      </Box>
    </>
  )
}

Forms.propTypes = {
  children: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string,
  submitText: PropTypes.string,
  disableSubmit: PropTypes.bool,
  isCancel: PropTypes.bool,
  cancelRoute: PropTypes.string
}

export { Forms }
