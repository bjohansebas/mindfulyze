import { createTheme, ThemeProvider } from '@mui/material/styles'
import { type PropsWithChildren } from 'react'

import type { } from '@mui/x-date-pickers/themeAugmentation'

const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#ffffff'
    },
    secondary: {
      light: '#3f8388',
      main: '#00575C',
      dark: '#002d32',
      contrastText: '#ffffff'
    },
    background: {
      default: '#F8FBFC',
      paper: '#EBF3F0'
    },
    text: {
      primary: '#fffff'
    }
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: '#00383D',
          color: '#ffffff',
          '& fieldset': {
            borderColor: '#3F8388'
          },
          '&.Mui-error fieldset': {
            borderColor: '#D25959 !important'
          },
          '&.Mui-error:hover fieldset': {
            borderColor: '#D25959 !important'
          },
          '&.Mui-focused fieldset': {
            borderColor: '#ffffff !important'
          },
          '&.Mui-focused.Mui-error fieldset': {
            borderColor: '#D25959 !important'
          },
          '&.Mui-disabled:hover fieldset': {
            borderColor: 'rgba(0, 0, 0, 0.38) !important'
          },
          '&:hover fieldset': {
            borderColor: '#ffffff !important'
          }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff',
          '&.Mui-focused': {
            color: '#ffffff'
          },
          '&.Mui-error': {
            color: '#D25959'
          }
        }
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          color: '#E1F5F4'
        }
      }
    },
    MuiIconButton: {
      styleOverrides: {
        colorPrimary: '#E1F5F4'
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textTransform: 'initial',
          fontSize: '1rem',
          '&.Mui-error': {
            color: '#D25959'
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: '#ffffff'
        }
      }
    }
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 14
  }
})

export default function PaletteFormProvider ({ children }: PropsWithChildren): JSX.Element {
  return (
    <ThemeProvider theme={mainTheme}>
      {children}
    </ThemeProvider>
  )
}
