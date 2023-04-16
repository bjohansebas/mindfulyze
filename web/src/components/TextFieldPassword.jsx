import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import PropTypes from 'prop-types'

TextFieldPassword.propTypes = {
  children: PropTypes.node,
  pwd: PropTypes.string.isRequired,
  setPwd: PropTypes.func.isRequired,
  showPassword: PropTypes.bool.isRequired,
  setShowPassword: PropTypes.func.isRequired,
  label: PropTypes.object,
  isDisable: PropTypes.bool,
  validPwd: PropTypes.bool
}

function TextFieldPassword ({ pwd, validPwd, setPwd, showPassword, setShowPassword, label, isDisable }) {
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleMouseDownPassword = (e) => e.preventDefault()

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">
        {label}
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? 'text' : 'password'}
        error={!validPwd && pwd !== ''}
        onChange={(e) => setPwd(e.target.value)}
        disabled={isDisable}
        label={label}
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

export { TextFieldPassword }
