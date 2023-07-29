import { Box, Button, Typography } from '@mui/material'
import { type FormEvent, type PropsWithChildren } from 'react'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from 'react-router-dom'

export interface FormsProps extends PropsWithChildren {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
  title: string | JSX.Element
  submitText: string | JSX.Element
  disableSubmit?: boolean
  isCancel?: boolean
  cancelRoute?: string
}

export function Forms({
  handleSubmit,
  title,
  submitText,
  children,
  disableSubmit,
  isCancel,
  cancelRoute,
}: FormsProps): JSX.Element {
  const navigate = useNavigate()
  const cancel = cancelRoute != null ? cancelRoute : '/'

  return (
    <>
      <Typography variant='h1' sx={{ fontSize: '1.4em', textAlign: 'center', mb: '10px' }}>
        {title}
      </Typography>
      <Box
        component='form'
        autoComplete='off'
        onSubmit={handleSubmit}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>{children}</Box>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: 2 }}>
          {isCancel === true && (
            <Button
              disabled={disableSubmit}
              variant='contained'
              size='large'
              onClick={() => {
                navigate(cancel)
              }}
            >
              <FormattedMessage id='button.cancel' defaultMessage='Cancel' />
            </Button>
          )}
          <Button disabled={disableSubmit} type='submit' variant='contained' size='large'>
            {submitText}
          </Button>
        </Box>
      </Box>
    </>
  )
}
