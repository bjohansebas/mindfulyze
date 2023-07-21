import { Box, FormControl, FormLabel } from '@mui/material'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { type Dayjs } from 'dayjs'

import { useId, useState, type Dispatch, type SetStateAction } from 'react'

export interface DateFieldProps {
  date: Dayjs | null
  setDate: Dispatch<SetStateAction<Dayjs | null>>
  label: JSX.Element
  errorDate?: string
  requiredValid?: boolean
  errorRequest?: string
  isDisable?: boolean
}

export function DateField({ date, errorRequest, errorDate, setDate, label, isDisable }: DateFieldProps): JSX.Element {
  const fieldId = useId()
  const [isErrorDate, setIsErrorDate] = useState(false)

  return (
    <FormControl variant='outlined' color='secondary'>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <FormLabel
          htmlFor={`date-${fieldId}`}
          error={isErrorDate}
          sx={{
            pl: '8px',
            '&.MuiFormLabel-root.Mui-error ~ .MuiInputBase-root .MuiSvgIcon-root': {
              color: '#D25959',
            },
          }}
        >
          {label}
        </FormLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            format='YYYY/MM/DD'
            views={['year', 'month', 'day']}
            value={date}
            onChange={(newValue) => {
              setDate(newValue)
            }}
            disabled={isDisable}
            onError={(error) => {
              setIsErrorDate(Boolean(error))
            }}
            slotProps={{
              popper: {
                color: 'secondary',
              },
              openPickerButton: {
                color: 'primary',
              },
              textField: {
                color: 'secondary',
                helperText: isErrorDate ? errorDate : errorRequest !== '' ? errorRequest : '',
              },
            }}
          />
        </LocalizationProvider>
      </Box>
    </FormControl>
  )
}
