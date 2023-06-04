import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource/poppins'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/700.css'

import '@formatjs/intl-pluralrules/polyfill'
import '@formatjs/intl-pluralrules/locale-data/es'
import '@formatjs/intl-pluralrules/locale-data/en'

import { App } from './App'
import PaletteProvider from './context/themeContext'
import { HelmetProvider } from 'react-helmet-async'
import { IntlProvider } from 'react-intl'
import messagesEs from 'translations/es.json'
import { CssBaseline } from '@mui/material'

const language = navigator.language.split(/[-_]/)[0]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <IntlProvider locale={language} messages={messagesEs}>
      <PaletteProvider>
        <HelmetProvider>
          <CssBaseline />
          <App />
        </HelmetProvider>
      </PaletteProvider>
    </IntlProvider>
  </React.StrictMode >
)
