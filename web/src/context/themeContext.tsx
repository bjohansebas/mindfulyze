import { createTheme, ThemeProvider } from '@mui/material/styles'
import { type PropsWithChildren } from 'react'

const mainTheme = createTheme({
  palette: {
    primary: {
      light: '#3f8388',
      main: '#00575C',
      dark: '#002d32',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#375677',
      main: '#062C55',
      dark: '#041E3B',
      contrastText: '#FFFFFF'
    },
    text: {
      primary: '#212121',
      secondary: '#424242'
    },
    background: {
      default: '#FFFFFF',
      paper: '#E1F5F4'
    },
    contrastThreshold: 4.5
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          '@media all': {
            maxWidth: '100vw'
          }
        }
      }
    }
  },
  mixins: {
    toolbar: { height: 58 }
  },
  typography: {
    fontFamily: 'Poppins',
    fontSize: 14
  }
})

export default function PaletteProvider ({ children }: PropsWithChildren): JSX.Element {
  return (
    <ThemeProvider theme={mainTheme}>
      {children}
    </ThemeProvider>
  )
}
