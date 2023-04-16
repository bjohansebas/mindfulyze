import { createTheme, ThemeProvider } from '@mui/material/styles'
import PropTypes from 'prop-types'

const mainTheme = createTheme({
  palette: {
    primary: {
      light: '#3f8388',
      main: '#00575C',
      dark: '#002d32',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#61d7c9',
      main: '#21a699',
      dark: '#00756',
      contrastText: '#000000'
    },
    text: {
      primary: '#212121',
      secondary: '#424242'
    },
    background: {
      default: '#fcfcfc'
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
  }
})

PaletteProvider.propTypes = {
  children: PropTypes.node
}

export default function PaletteProvider ({ children }) {
  return (
    <ThemeProvider theme={mainTheme}>
      {children}
    </ThemeProvider>
  )
}
