import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource/poppins'
import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/locale-data/es'
import '@formatjs/intl-pluralrules/locale-data/en'

import { App } from './App'
import PaletteProvider from './context/themeContext'
import { AuthProvider } from './context/authContext'
import { HelmetProvider } from 'react-helmet-async'
import { IntlProvider } from 'react-intl'
import messagesEs from './translations/es'
import { CssBaseline } from '@mui/material'

const messages = {
  es: messagesEs
}

const language = navigator.language.split(/[-_]/)[0]

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IntlProvider locale={language} messages={messages[language]}>
      <PaletteProvider>
        <HelmetProvider>
          <AuthProvider>
            <CssBaseline/>
            <App />
          </AuthProvider>
        </HelmetProvider>
      </PaletteProvider>
    </IntlProvider>
  </React.StrictMode >
)
