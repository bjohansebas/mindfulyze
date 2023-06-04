import { Autocomplete, TextField } from '@mui/material'
import { type Dispatch, type SetStateAction } from 'react'
import { FormattedMessage } from 'react-intl'

export interface OptionsProps {
  id: string
  text: string
}

export interface AutocompleteFieldProps {
  select: OptionsProps[]
  setSelect: Dispatch<SetStateAction<OptionsProps[]>>
  options: OptionsProps[]
  loading?: boolean
}

export function AutocompleteField ({ options, loading, select, setSelect }: AutocompleteFieldProps): JSX.Element {
  return <Autocomplete multiple
    id="tags-standard"
    value={select}
    onChange={(_, newValue) => {
      setSelect(newValue)
    }}
    disabled={loading}
    options={options}
    getOptionLabel={(option) => option.text}
    isOptionEqualToValue={(option, value) => option.id === value.id}
    renderInput={(params) => (
      <TextField {...params}
        variant="standard"
        label={<FormattedMessage id="think.new.emotion" defaultMessage="Emotions" />}
      />
    )} />
}
